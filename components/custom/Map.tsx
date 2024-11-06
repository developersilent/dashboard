"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { useEffect, useState, useMemo, useRef } from "react";
import { startAutoFetch } from "@/lib/help";

import type L from "leaflet";

interface Location {
    Id: string;
    Latitude: number;
    Longitude: number;
    Time: string;
}

// Dynamically import components with SSR disabled
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

export default function Map() {
    const [data, setData] = useState<Location[]>([]);
    const mapRef = useRef<L.Map | null>(null); // Correctly typed ref

    // Fetch location data
    const getLoc = async () => {
        try {
            const res = await fetch("https://exunbackend.onrender.com/getLocations", {
                method: "GET",
                next: {
                    revalidate: 4, // Revalidate every 5 seconds
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

    // Memoize the MapContainer to prevent re-initialization
    return useMemo(() => (
        <MapContainer
            center={[51.505, -0.09]}
            zoom={10}
            ref={mapRef} // Corrected ref usage here
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {data.map((location) => (
                <Marker key={location.Id} position={[location.Latitude, location.Longitude]}>
                    <Popup>
                        <span>{location.Time}</span>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    ), [data]); // Only rerender when data changes
}