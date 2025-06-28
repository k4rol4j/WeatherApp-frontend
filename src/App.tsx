import { useEffect, useState } from 'react';
import { fetchForecast, fetchSummary } from './features/weather/WeatherService';
import { WeatherForecast } from './components/WeatherForecast';
import { WeatherSummary } from './components/WeatherSummary';
import type {DailyForecast, WeeklySummary} from "./types/weather.ts";

function App() {
    const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
    const [forecast, setForecast] = useState<DailyForecast[]>([]);
    const [summary, setSummary] = useState<WeeklySummary | null>(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                setCoords({ lat: latitude, lng: longitude });
            },
            (err) => console.error(err),
            { enableHighAccuracy: true }
        );
    }, []);

    useEffect(() => {
        if (!coords) return;
        const getData = async () => {
            try {
                const f = await fetchForecast(coords.lat, coords.lng);
                const s = await fetchSummary(coords.lat, coords.lng);
                setForecast(f);
                setSummary(s);
            } catch (e) {
                console.error(e);
            }
        };
        getData();
    }, [coords]);

    if (!coords) return <p>Loading location...</p>;

    return (
        <div className="app-container">
            <h1>Weather PV Forecast</h1>
            {forecast.length > 0 && <WeatherForecast forecast={forecast} />}
            {summary && <WeatherSummary summary={summary} />}
        </div>
    );
}

export default App;