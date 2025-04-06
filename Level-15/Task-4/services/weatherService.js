import axios from "axios";
import dotenv from "dotenv";
import Weather from "../models/Weather.js";

dotenv.config();

const fetchWeatherData = async () => {
    try {
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${process.env.CITY_NAME}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
        
        const response = await axios.get(API_URL);
        const { main, weather, name } = response.data;
        
        const newWeather = new Weather({
            city: name,
            temperature: main.temp,
            humidity: main.humidity,
            weather: weather[0].description
        });

        await newWeather.save();
        console.log(`🌦 Weather data saved for ${name}: ${main.temp}°C, ${weather[0].description}`);
    } catch (error) {
        console.error("❌ Error fetching weather data:", error.message);
    }
};

export default fetchWeatherData;
