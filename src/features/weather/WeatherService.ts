import axios from 'axios'
import type { DailyForecast, WeeklySummary } from '../../types/weather'

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
})

export class WeatherService {
    async fetchForecast(lat: number, lng: number): Promise<DailyForecast[]> {
        const res = await api.get<DailyForecast[]>('/weather/forecast', {
            params: { lat, lng },
        })
        return res.data
    }

    async fetchSummary(lat: number, lng: number): Promise<WeeklySummary> {
        const res = await api.get<WeeklySummary>('/weather/summary', {
            params: { lat, lng },
        })
        return res.data
    }
}
