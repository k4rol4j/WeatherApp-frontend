import React from 'react';
import { Card, Text, Box, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconCloud, IconCloudRain, IconSnowflake } from '@tabler/icons-react';
import type { DailyForecast } from '../types/weather';

interface Props {
    forecast: DailyForecast[];
}

const iconMap: Record<number, React.ReactNode> = {
    0: <IconSun size={40} />, 1: <IconSun size={40} />, 2: <IconCloud size={40} />, 3: <IconCloud size={40} />,
    45: <IconCloud size={40} />, 48: <IconCloud size={40} />, 51: <IconCloudRain size={40} />, 53: <IconCloudRain size={40} />,
    55: <IconCloudRain size={40} />, 61: <IconCloudRain size={40} />, 63: <IconCloudRain size={40} />, 65: <IconCloudRain size={40} />,
    71: <IconSnowflake size={40} />, 73: <IconSnowflake size={40} />, 75: <IconSnowflake size={40} />,
};

export const WeatherForecast: React.FC<Props> = ({ forecast }) => {
    const { colorScheme } = useMantineColorScheme();
    const isDark = colorScheme === 'dark';

    return (
        <Box style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', gap: '1rem', padding: '1rem 0' }}>
            {forecast.map((day) => (
                <Card
                    key={day.date}
                    shadow="md"
                    padding="md"
                    radius="lg"
                    withBorder
                    style={{
                        minWidth: 160,
                        flexShrink: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        backgroundColor: isDark ? '#2c2e33' : '#f9f9f9',
                        cursor: 'pointer',
                        flexWrap: 'nowrap',
                        overflowX: 'auto',
                        gap: '1rem',
                        padding: '1rem 0',
                    }}
                    onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
                        (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                        (e.currentTarget as HTMLElement).style.boxShadow = '';
                    }}
                >
                    <Text fw={600} size="sm" mb="xs">
                        {new Date(day.date).toLocaleDateString()}
                    </Text>
                    <Box mb="sm">
                        {iconMap[day.weatherCode] || <IconCloud size={40} />}
                    </Box>
                    <Text size="sm">
                        <strong>{day.tempMax}°C</strong> / {day.tempMin}°C
                    </Text>
                    <Text size="xs" mt="xs">
                        Energia: {day.energy.toFixed(2)} kWh
                    </Text>
                </Card>
            ))}
        </Box>
    );
};