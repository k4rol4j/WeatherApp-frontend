import axios from 'axios';
import type {DailyForecast, WeeklySummary} from "../../types/weather.ts";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

export const fetchForecast = async (lat: number, lng: number): Promise<DailyForecast[]> => {
    const res = await api.get('/weather/forecast', { params: { lat, lng } });
    return res.data;
};

export const fetchSummary = async (lat: number, lng: number): Promise<WeeklySummary> => {
    const res = await api.get('/weather/summary', { params: { lat, lng } });
    return res.data;
};