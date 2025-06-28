import  { useEffect, useState } from 'react';
import {
    Container,
    Paper,
    Title,
    ActionIcon,
    Center,
    Loader,
    Space,
    useMantineColorScheme,
} from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import { WeatherMap } from './components/WeatherMap';
import { WeatherForecast } from './components/WeatherForecast';
import { WeatherSummary } from './components/WeatherSummary';
import type { DailyForecast, WeeklySummary } from './types/weather';
import { WeatherService } from './features/weather/WeatherService';

export default function App() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
        null
    );
    const [forecast, setForecast] = useState<DailyForecast[]>([]);
    const [summary, setSummary] = useState<WeeklySummary | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            ({ coords }) =>
                setCoords({ lat: coords.latitude, lng: coords.longitude }),
            () => setCoords({ lat: 52, lng: 21 }), // fallback
            { enableHighAccuracy: true }
        );
    }, []);

    useEffect(() => {
        if (!coords) return;
        setLoading(true);
        const svc = new WeatherService();
        Promise.all([
            svc.fetchForecast(coords.lat, coords.lng),
            svc.fetchSummary(coords.lat, coords.lng),
        ])
            .then(([f, s]) => {
                setForecast(f);
                setSummary(s);
            })
            .catch((err) => console.error('Error fetching weather:', err))
            .finally(() => setLoading(false));
    }, [coords]);

    return (
        <Container fluid py="md">
            <Paper
                radius="md"
                p="md"
                mb="lg"
                withBorder
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: dark ? '#1A1B1E' : '#0d47a1',
                    color: 'white',
                }}
            >
                <Title order={1}>Prognoza pogody</Title>
                <ActionIcon
                    variant="outline"
                    color={dark ? 'yellow' : 'blue'}
                    onClick={() => toggleColorScheme()}
                    title="Zmień motyw"
                >
                    {dark ? <IconSun size={20} /> : <IconMoonStars size={20} />}
                </ActionIcon>
            </Paper>

            {coords && <WeatherMap lat={coords.lat} lng={coords.lng} />}

            {loading ? (
                <Center style={{ height: 200 }}>
                    <Loader size="lg" />
                </Center>
            ) : (
                <>
                    <Title order={2} mb="md">
                        Prognoza pogody na najbliższe 7 dni
                    </Title>
                    <WeatherForecast forecast={forecast} />

                    <Space h="lg" />

                    {summary && <WeatherSummary summary={summary} />}
                </>
            )}
        </Container>
    );
}
