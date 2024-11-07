"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import React, {useEffect, useState, forwardRef} from "react";
import {startAutoFetch, isBrowser} from "@/lib/help"; // Ensure isBrowser is imported
import {useMap} from "react-leaflet";
import type * as L from 'leaflet';

interface Location {
    Id: string;
    Latitude: number;
    Longitude: number;
    Time: string;
}

interface MapProps {
    mapRef: React.RefObject<L.Map>;
}

// Dynamically import components with SSR disabled
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), {ssr: false});
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), {ssr: false});
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), {ssr: false});
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), {ssr: false});

const Map = forwardRef<HTMLDivElement, MapProps>(({mapRef}, ref) => {
    const [isClient, setIsClient] = useState<boolean>(false);
    const [L, setL] = useState<typeof import("leaflet") | null>(null); // Leaflet instance
    const [icon, setIcon] = useState<L.Icon | null>(null); // Custom icon

    useEffect(() => {
        if (isBrowser()) {
            setIsClient(true);
            import("leaflet").then((L) => {
                setL(L); // Set Leaflet when it's available
                const customIcon = new L.Icon({
                    iconUrl: "/location-icon.svg", // Adjust the path if needed
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                });
                setIcon(customIcon); // Set the custom icon
            });
        }
    }, []);

    const [data, setData] = useState<Location[]>([]);
    const [mapInitialized, setMapInitialized] = useState(false); // Track map initialization

    // Fetch location data
    const getLoc = async () => {
        try {
            const res = await fetch("https://exunbackend.onrender.com/getLocations", {
                method: "GET",
                next: {
                    revalidate: 4, // Revalidate every 4 seconds
                }
            });
            const jsonData = await res.json();
            setData(jsonData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        // Auto-fetch locations every 5 seconds
        startAutoFetch(() => {
            getLoc();
        });
    }, []); // Only run once on component mount

    // Custom hook to access the map instance
    const MapEvents = () => {
        const map = useMap();
        useEffect(() => {
            if (map) {
                map.setView([30, 20], 2);
                map.setMaxBounds([
                    [85, -180],  // Maximum latitude (North Pole)
                    [-85, 180]   // Minimum latitude (South Pole)
                ]);
                if (!mapInitialized) {
                    setMapInitialized(true);
                    console.log("Map instance initialized!");
                }
            }
        }, [map]); // Run when `map` is available

        return null; // This component does not need to render anything
    };

    return (
        <>
            {isClient ? (
                <MapContainer
                    center={[28.7041, 77.1025]}
                    zoom={7}
                    minZoom={1.3}
                    style={{height: "100%", width: "100%"}}
                    whenReady={() => {
                        if (!mapInitialized) {
                            setMapInitialized(true); // Initialize once
                            console.log("Map is ready");
                        }
                    }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {data.map((location) => (
                        <Marker key={location.Id} position={[location.Latitude, location.Longitude]} icon={icon!}>
                            <Popup>
                                <span>{location.Time}</span>
                            </Popup>
                        </Marker>
                    ))}
                    <MapEvents/> {/* Use MapEvents to access and manipulate the map */}
                </MapContainer>
            ) : (
                <div
                    className="min-h-screen flex items-center justify-center bg-[hsl(var(--background))] text-[hsl(var(--foreground))] p-4 md:p-6">
                    <p>Loading...</p>
                </div>
            )}
        </>
    )
});

Map.displayName = "Map";

export default Map;