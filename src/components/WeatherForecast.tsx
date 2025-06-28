import type {DailyForecast} from "../types/weather.ts";
import { format } from 'date-fns';
import {
    faSun,
    faCloud,
    faCloudRain,
    faSnowflake, type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './WeatherForecast.css';


interface Props {
    forecast: DailyForecast[];
}

const codeMap: Record<number, IconDefinition> = {
    0: faSun,
    1: faSun,
    2: faCloud,
    3: faCloud,
    45: faCloud,
    48: faCloud,
    51: faCloudRain,
    53: faCloudRain,
    55: faCloudRain,
    61: faCloudRain,
    63: faCloudRain,
    65: faCloudRain,
    71: faSnowflake,
    73: faSnowflake,
    75: faSnowflake,
};

export const WeatherForecast = ({ forecast }: Props) => {
    return (
        <div className="forecast-grid">
            {forecast.map((day) => (
                <div key={day.date} className="forecast-col">
                    <div className="date">
                        {format(new Date(day.date), 'dd/MM/yyyy')}
                    </div>
                    <div className="icon">
                        <FontAwesomeIcon
                            icon={codeMap[day.weatherCode] || faCloud}
                            size="2x"
                        />
                    </div>
                    <div className="temps">
                        <span>{day.tempMax}°C</span>
                        <span>{day.tempMin}°C</span>
                    </div>
                    <div className="energy">
                        {day.energy} kWh
                    </div>
                </div>
            ))}
        </div>
    );
};