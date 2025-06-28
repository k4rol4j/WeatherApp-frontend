import type {DailyForecast} from "../types/weather.ts";

interface Props {
    forecast: DailyForecast[];
}

export const WeatherForecast = ({ forecast }: Props) => {
    return (
        <table>
            <thead>
            <tr>
                <th>Date</th>
                <th>Min Temp</th>
                <th>Max Temp</th>
                <th>Weather Code</th>
                <th>Energy [kWh]</th>
            </tr>
            </thead>
            <tbody>
            {forecast.map((day) => (
                <tr key={day.date}>
                    <td>{day.date}</td>
                    <td>{day.tempMin}°C</td>
                    <td>{day.tempMax}°C</td>
                    <td>{day.weatherCode}</td>
                    <td>{day.energy} kWh</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};