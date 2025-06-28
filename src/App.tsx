import React, { useEffect, useState } from 'react';
import {
    Container,
    Paper,
    Title,
    ActionIcon,
    Loader,
    Text,
    Space,
    Center,
    useMantineColorScheme,
} from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import type { DailyForecast, WeeklySummary } from "./types/weather";
import { WeatherService } from "./features/weather/WeatherService";
import { WeatherSummary } from "./components/WeatherSummary";
import { WeatherForecast } from "./components/WeatherForecast";
import { WeatherMap } from "./components/WeatherMap";

const App: React.FC = () => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [forecast, setForecast] = useState<DailyForecast[]>([]);
    const [summary, setSummary] = useState<WeeklySummary | null>(null);
    const [loadingWeather, setLoadingWeather] = useState(false);
    const [resetTrigger, setResetTrigger] = useState(false);

    const resetToCurrentLocation = () => {
        setResetTrigger(true);
        if (!navigator.geolocation) {
            setError('Przeglądarka nie wspiera geolokalizacji.');
            return;
        }
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                setCoords({ lat: coords.latitude, lng: coords.longitude });
                setTimeout(() => setResetTrigger(false), 100);
            },
            () => setError('Nie udało się pobrać Twojej lokalizacji.')
        );
    };

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Przeglądarka nie wspiera geolokalizacji, pokazuję Warszawę.');
            setCoords({ lat: 52.2297, lng: 21.0122 });
            return;
        }
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => setCoords({ lat: coords.latitude, lng: coords.longitude }),
            () => {
                setError('Nie udało się pobrać lokalizacji, pokazuję Warszawę.');
                setCoords({ lat: 52.2297, lng: 21.0122 });
            },
            { enableHighAccuracy: true, timeout: 5000 }
        );
    }, []);

    useEffect(() => {
        if (!coords) return;
        setLoadingWeather(true);
        const svc = new WeatherService();
        Promise.all([
            svc.fetchForecast(coords.lat, coords.lng),
            svc.fetchSummary(coords.lat, coords.lng),
        ])
            .then(([f, s]) => {
                setForecast(f);
                setSummary(s);
            })
            .catch(() => {
                setError('Nie udało się pobrać prognozy pogody.');
            })
            .finally(() => setLoadingWeather(false));
    }, [coords]);

    if (!coords) {
        return (
            <Center style={{ height: '100vh' }}>
                <Loader size="lg" />
            </Center>
        );
    }

    return (
        <Container fluid pt="md" style={{ maxWidth: '1400px' }}>
            <Paper
                radius="md"
                p="md"
                mb="md"
                withBorder
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: dark ? '#1A1B1E' : '#0d47a1',
                    color: 'white',
                }}
            >
                <Title order={1} style={{ margin: 0 }}>
                    Prognoza pogody
                </Title>
                <ActionIcon
                    variant="outline"
                    color={dark ? 'yellow' : 'blue'}
                    onClick={() => toggleColorScheme()}
                    title="Zmień motyw"
                >
                    {dark ? <IconSun size={20} /> : <IconMoonStars size={20} />}
                </ActionIcon>
            </Paper>

            {error && (
                <Text
                    style={{
                        color: 'red',
                        textAlign: 'center',
                        marginBottom: '1rem',
                    }}
                >
                    {error}
                </Text>
            )}

            <WeatherMap
                lat={coords.lat}
                lng={coords.lng}
                onLocationSelect={(lat, lng) => setCoords({ lat, lng })}
                onResetLocation={resetToCurrentLocation}
                resetTrigger={resetTrigger}
            />

            {loadingWeather ? (
                <Center style={{ height: 200 }}>
                    <Loader size="lg" />
                </Center>
            ) : (
                <>
                    <Title order={2} style={{ margin: '2rem 0 1rem', textAlign: 'center' }}>
                        Prognoza na najbliższe 7 dni
                    </Title>
                    <WeatherForecast forecast={forecast} />
                    <Space h="md" />
                    {summary && <WeatherSummary summary={summary} />}
                </>
            )}
        </Container>
    );
};

export default App;
