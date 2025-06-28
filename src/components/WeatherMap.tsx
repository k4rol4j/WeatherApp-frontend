import React, { useEffect, useState } from 'react';
import { Card, ActionIcon, Tooltip } from '@mantine/core';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { IconTarget } from '@tabler/icons-react';

interface Props {
    lat: number;
    lng: number;
    onLocationSelect?: (lat: number, lng: number) => void;
    onResetLocation?: () => void;
    resetTrigger?: boolean;
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

function LocationMarker({ onLocationSelect, resetTrigger }: { onLocationSelect?: (lat: number, lng: number) => void; resetTrigger?: boolean; }) {
    const [position, setPosition] = useState<L.LatLng | null>(null);

    useMapEvents({
        click(e) {
            setPosition(e.latlng);
            onLocationSelect?.(e.latlng.lat, e.latlng.lng);
        },
    });

    useEffect(() => {
        if (resetTrigger) {
            setPosition(null);
        }
    }, [resetTrigger]);

    return position === null ? null : <Marker position={position} />;
}

export const WeatherMap: React.FC<Props> = ({ lat, lng, onLocationSelect, onResetLocation, resetTrigger }) => (
    <Card
        withBorder
        radius="md"
        p={0}
        style={{
            overflow: 'hidden',
            width: '100%',
            maxWidth: '100%',
            height: 300,
            position: 'relative',
        }}
    >
        <MapContainer
            center={[lat, lng]}
            zoom={8}
            scrollWheelZoom={true}
            style={{ width: '100%', height: '100%' }}
        >
            <ResizeMap />
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[lat, lng]} />
            <LocationMarker onLocationSelect={onLocationSelect} resetTrigger={resetTrigger} />
        </MapContainer>

        {onResetLocation && (
            <Tooltip label="Powrót do mojej lokalizacji" withArrow>
                <ActionIcon
                    onClick={onResetLocation}
                    variant="filled"
                    color="blue"
                    size="lg"
                    style={{
                        position: 'absolute',
                        bottom: 16,
                        right: 16,
                        zIndex: 1000,
                    }}
                >
                    <IconTarget size={20} />
                </ActionIcon>
            </Tooltip>
        )}
    </Card>
);
