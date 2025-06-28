import { useEffect, useState } from 'react';
import { fetchForecast, fetchSummary } from './features/weather/WeatherService';
import { WeatherForecast } from './components/WeatherForecast';
import { WeatherSummary } from './components/WeatherSummary';
import type {DailyForecast, WeeklySummary} from "./types/weather.ts";

function App() {
    const [forecast, setForecast] = useState<DailyForecast[]>([]);
    const [summary, setSummary] = useState<WeeklySummary | null>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const lat = 52;
                const lng = 21;
                const forecastData = await fetchForecast(lat, lng);
                const summaryData = await fetchSummary(lat, lng);
                setForecast(forecastData);
                setSummary(summaryData);
            } catch (error) {
                console.error(error);
            }
        };

        getData();
    }, []);

    return (
        <div>
            <h1>Weather PV Forecast</h1>
            {forecast.length > 0 && <WeatherForecast forecast={forecast} />}
            {summary && <WeatherSummary summary={summary} />}
        </div>
    );
}

export default App;