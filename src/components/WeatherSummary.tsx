import React from 'react';
import { Card, Title, Text, Box } from '@mantine/core';
import type { WeeklySummary } from '../types/weather';

interface Props {
    summary: WeeklySummary;
}

export const WeatherSummary: React.FC<Props> = ({ summary }) => (
    <Card shadow="sm" p="lg" radius="md" withBorder>
        <Title
            order={2}
            style={{ textAlign: 'center', marginBottom: '1rem' }}
        >
            Podsumowanie tygodnia
        </Title>
        <Box>
            <Text style={{ marginBottom: '0.5rem' }}>
                Min Temp: {summary.minTemp}°C
            </Text>
            <Text style={{ marginBottom: '0.5rem' }}>
                Max Temp: {summary.maxTemp}°C
            </Text>
            <Text style={{ marginBottom: '0.5rem' }}>
                Średnie ciśnienie: {summary.avgPressure} hPa
            </Text>
            <Text style={{ marginBottom: '0.5rem' }}>
                Średnia ekspozycja: {summary.avgExposure} kWh/m²
            </Text>
            <Text>
                Podsumowanie: {summary.summary}
            </Text>
        </Box>
    </Card>
);
