export interface DailyForecast {
    date: string;
    weatherCode: number;
    tempMin: number;
    tempMax: number;
    energy: number;
}

export interface WeeklySummary {
    avgPressure: number;
    avgExposure: number;
    minTemp: number;
    maxTemp: number;
    summary: string;
}