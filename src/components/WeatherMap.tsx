import React from 'react';
import { Card } from '@mantine/core';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

interface Props {
    lat: number;
    lng: number;
}

export const WeatherMap: React.FC<Props> = ({ lat, lng }) => (
    <Card withBorder radius="md" mb="lg" p={0} style={{ overflow: 'hidden' }}>
        <MapContainer
            center={[lat, lng]}
            zoom={8}
            scrollWheelZoom={false}
            style={{ width: '100%', height: 300 }}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[lat, lng]} />
        </MapContainer>
    </Card>
);
