import React, { useEffect } from 'react';
import { Card } from '@mantine/core';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

interface Props {
    lat: number;
    lng: number;
}

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

function ResizeMap() {
    const map = useMap();
    useEffect(() => {
        setTimeout(() => map.invalidateSize(), 0);
    }, [map]);
    return null;
}

export const WeatherMap: React.FC<Props> = ({ lat, lng }) => (
    <Card withBorder radius="md" mb="lg" p={0} style={{ height: 300 }}>
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <MapContainer
                center={[lat, lng]}
                zoom={8}
                scrollWheelZoom={false}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                }}
            >
                <ResizeMap />
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[lat, lng]} />
            </MapContainer>
        </div>
    </Card>
);
