import * as dotenv from "dotenv";

dotenv.config();

const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY;

export async function getCurrentWeather(lat, lon) {
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${OPEN_WEATHER_API_KEY}`);
        
        if (!res.ok) {
            throw new Error(`Failed to fetch weather data: ${res.statusText}`);
        }

        const data = await res.json();

        return {
            city: data.name,
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`,
            description: data.weather[0].description,
            currentTemp: Math.trunc(data.main.temp),
            minTemp: Math.trunc(data.main.temp_min),
            maxTemp: Math.trunc(data.main.temp_max),
        };
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;  // Re-throw the error so that the calling function can handle it
    }
}
