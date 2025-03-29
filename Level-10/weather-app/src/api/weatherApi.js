import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY; // Get API key from .env
const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";

export const getWeatherData = async (city) => {
  try {
    const res = await axios.get(`${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};
