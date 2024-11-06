"use client";
import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const Map = () => {
    const [isClient, setIsClient] = useState(false);
    const mapRef = useRef<L.Map | null>(null); // Reference to the map instance

    useEffect(() => {
        setIsClient(true); // Ensure that we are in the client-side environment
    }, []);

    if (!isClient) {
        return null; // Render nothing on the server
    }

    const customIcon = new L.Icon({
        iconUrl: 'location-icon.svg', // URL to your custom icon
        iconSize: [42, 42], // Size of the icon
        iconAnchor: [16, 32], // Point of the icon which will be the marker's position
        popupAnchor: [0, -32], // Position of the popup relative to the icon
    });

    const helpIcon = new L.Icon({
        iconUrl: 'need-help-location.svg', // URL to your custom icon
        iconSize: [42, 42], // Size of the icon
        iconAnchor: [16, 32], // Point of the icon which will be the marker's position
        popupAnchor: [0, -32], // Position of the popup relative to the icon
    });

    const position = [51.505, -0.09] as [number, number]; // Center of the map

    const locations = [
        { id: 1, position: [37.7410, -25.6750] as [number, number], label: 'Marker 1', help: true, requestedAt: new Date() },
        { id: 2, position: [59.0, -35.0] as [number, number], label: 'Marker 2' },
        { id: 3, position: [-15.0, -40.0] as [number, number], label: 'Marker 3' },
    ];

    const bounds = [
        [85.0511, -180] as [number, number],   // Top-left corner (max latitude)
        [-85.0511, 180] as [number, number]   // Bottom-right corner (min latitude)
    ];

    return (
        <MapContainer
            center={position}
            zoom={1.1}
            minZoom={1.2}
            style={{ width: '100%', height: '100%' }}
            maxBounds={bounds}
            maxBoundsViscosity={1.1} // Elastic bounce-back effect
            whenCreated={(mapInstance) => {
                mapRef.current = mapInstance; // Store the map instance
            }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {locations.map((loc) => (
                <Marker key={loc.id} position={loc.position} icon={loc.help ? helpIcon : customIcon} autoPanOnFocus={true}>
                    <Popup>{loc.label}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;
