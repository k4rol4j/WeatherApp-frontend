import type {WeeklySummary} from "../types/weather.ts";

interface Props {
    summary: WeeklySummary;
}

export const WeatherSummary = ({ summary }: Props) => {
    return (
        <div>
            <h2>Weekly Summary</h2>
            <p>Average Pressure: {summary.avgPressure} hPa</p>
            <p>Average Exposure: {summary.avgExposure} kWh/m²</p>
            <p>Min Temp: {summary.minTemp}°C</p>
            <p>Max Temp: {summary.maxTemp}°C</p>
            <p>Summary: {summary.summary}</p>
        </div>
    );
};