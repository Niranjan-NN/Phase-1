import axios from "axios";

const API_KEY = 'eb85ea2d9fa59ddd7dcec16efbfc3cb6';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Extended city list
const cityCoordinates = {
  'new york': { lat: 40.7128, lon: -74.006, country: 'US' },
  'london': { lat: 51.5074, lon: -0.1278, country: 'GB' },
  'paris': { lat: 48.8566, lon: 2.3522, country: 'FR' },
  'tokyo': { lat: 35.6762, lon: 139.6503, country: 'JP' },
  'sydney': { lat: -33.8688, lon: 151.2093, country: 'AU' },
  'berlin': { lat: 52.52, lon: 13.405, country: 'DE' },
  'rome': { lat: 41.9028, lon: 12.4964, country: 'IT' },
  'madrid': { lat: 40.4168, lon: -3.7038, country: 'ES' },
  'moscow': { lat: 55.7558, lon: 37.6173, country: 'RU' },
  'beijing': { lat: 39.9042, lon: 116.4074, country: 'CN' },

  // Tamil Nadu cities
  'chennai': { lat: 13.0827, lon: 80.2707, country: 'IN' },
  'coimbatore': { lat: 11.0168, lon: 76.9558, country: 'IN' },
  'madurai': { lat: 9.9252, lon: 78.1198, country: 'IN' },
  'trichy': { lat: 10.7905, lon: 78.7047, country: 'IN' },
  'tirunelveli': { lat: 8.7139, lon: 77.7567, country: 'IN' },
    'pudukkottai': { lat: 10.3813, lon: 78.8214, country: 'IN' },
  'ranipet': { lat: 12.9317, lon: 79.3335, country: 'IN' },
  'tindivanam': { lat: 12.2431, lon: 79.6546, country: 'IN' },
  'ulundurpet': { lat: 11.7045, lon: 79.3319, country: 'IN' },
  'villupuram': { lat: 11.9390, lon: 79.4935, country: 'IN' },
  'panruti': { lat: 11.7753, lon: 79.5520, country: 'IN' },
  'tambaram': { lat: 12.9249, lon: 80.1000, country: 'IN' },
  'avadi': { lat: 13.1144, lon: 80.1096, country: 'IN' },
  'ambattur': { lat: 13.1066, lon: 80.1588, country: 'IN' },
  'kanchipuram': { lat: 12.8342, lon: 79.7036, country: 'IN' },
  'chengalpattu': { lat: 12.6929, lon: 79.9757, country: 'IN' },
  'arakkonam': { lat: 13.0827, lon: 79.6700, country: 'IN' },
  'tiruvannamalai': { lat: 12.2253, lon: 79.0747, country: 'IN' },
  'vellakoil': { lat: 10.9529, lon: 77.7172, country: 'IN' },
  'gobichettipalayam': { lat: 11.4551, lon: 77.4422, country: 'IN' },
  'palladam': { lat: 10.9915, lon: 77.2865, country: 'IN' },
  'mettupalayam': { lat: 11.2992, lon: 76.9342, country: 'IN' },
  'pollachi': { lat: 10.6600, lon: 77.0100, country: 'IN' },
  'udumalpet': { lat: 10.5830, lon: 77.2479, country: 'IN' },
  'aruppukkottai': { lat: 9.5090, lon: 78.0960, country: 'IN' },
  'virudhunagar': { lat: 9.5860, lon: 77.9579, country: 'IN' },
  'rajapalayam': { lat: 9.4533, lon: 77.5531, country: 'IN' },
  'sankarankovil': { lat: 9.1734, lon: 77.5448, country: 'IN' },
  'thoothukudi': { lat: 8.7642, lon: 78.1348, country: 'IN' },
  'vellore': { lat: 12.9165, lon: 79.1325, country: 'IN' },
  'salem': { lat: 11.6643, lon: 78.1460, country: 'IN' },
  'erode': { lat: 11.3410, lon: 77.7172, country: 'IN' },
  'karur': { lat: 10.9601, lon: 78.0766, country: 'IN' },
  'hosur': { lat: 12.7400, lon: 77.8300, country: 'IN' },
  'dindigul': { lat: 10.3673, lon: 77.9803, country: 'IN' },
  'nagapattinam': { lat: 10.7630, lon: 79.8434, country: 'IN' },
  'thanjavur': { lat: 10.7867, lon: 79.1378, country: 'IN' },
  'cuddalore': { lat: 11.7447, lon: 79.7680, country: 'IN' },
  'ariyalur': { lat: 11.1385, lon: 79.0755, country: 'IN' },
  'kumbakonam': { lat: 10.9620, lon: 79.3886, country: 'IN' },
  'namakkal': { lat: 11.2280, lon: 78.1652, country: 'IN' },
  'tiruppur': { lat: 11.1085, lon: 77.3411, country: 'IN' },
  'theni': { lat: 10.0104, lon: 77.4777, country: 'IN' },
  'krishnagiri': { lat: 12.5186, lon: 78.2138, country: 'IN' },
  'sivakasi': { lat: 9.4496, lon: 77.7974, country: 'IN' },
  'perambalur': { lat: 11.2333, lon: 78.8833, country: 'IN' }
};


export const isValidCity = (city) =>
  typeof city === 'string' && cityCoordinates[city.toLowerCase()] !== undefined;

export const fetchWeatherByCity = async (cityOrCoords) => {
  if (!cityOrCoords) throw new Error('Location not provided');

  let coords, cityName;

  if (typeof cityOrCoords === 'object' && 'lat' in cityOrCoords) {
    coords = cityOrCoords;
    cityName = 'Current Location';
  } else if (typeof cityOrCoords === 'string') {
    const cityKey = cityOrCoords.toLowerCase();
    const cityData = cityCoordinates[cityKey];
    if (!cityData) throw new Error('City not found');
    coords = cityData;
    cityName = cityOrCoords;
  } else {
    throw new Error('Invalid location format');
  }

  return generateCurrentWeather(cityName, coords);
};

export const fetchForecastByCity = async (cityOrCoords) => {
  if (!cityOrCoords) throw new Error('Location not provided');

  let coords, cityName;

  if (typeof cityOrCoords === 'object' && 'lat' in cityOrCoords) {
    coords = cityOrCoords;
    cityName = 'Current Location';
  } else if (typeof cityOrCoords === 'string') {
    const cityKey = cityOrCoords.toLowerCase();
    const cityData = cityCoordinates[cityKey];
    if (!cityData) throw new Error('City not found');
    coords = cityData;
    cityName = cityOrCoords;
  } else {
    throw new Error('Invalid location format');
  }

  return {
    cod: '200',
    message: 0,
    cnt: 40,
    list: generateForecastList(coords),
    city: {
      id: generateCityId(cityName),
      name: cityName,
      coord: { lat: coords.lat, lon: coords.lon },
      country: coords.country || 'Unknown',
      population: Math.floor(Math.random() * 10000000) + 1000000,
      timezone: Math.floor(Math.random() * 12) * 3600,
      sunrise: Math.floor(Date.now() / 1000) - 21600,
      sunset: Math.floor(Date.now() / 1000) + 21600
    }
  };
};

export const fetchHistoricalData = async (lat, lon) => {
  return generateHistoricalData(lat);
};

export const searchCities = async (query) => {
  if (!query) return [];

  const cities = Object.entries(cityCoordinates).map(([name, data]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    country: data.country
  }));

  return cities.filter(city =>
    city.name.toLowerCase().includes(query.toLowerCase())
  );
};

export const getRecentSearches = () => {
  const searches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
  return searches.filter(city => typeof city === 'string' && isValidCity(city));
};

// -----------------------
// Mock Data Generators
// -----------------------

function generateCurrentWeather(city, coords) {
  const { lat, lon, country } = coords;
  const baseTemp = 293.15 - Math.abs(lat) * 0.5;

  return {
    coord: { lon, lat },
    weather: [generateWeather(lat)],
    base: 'stations',
    main: {
      temp: baseTemp,
      feels_like: baseTemp - 0.5,
      temp_min: baseTemp - 2,
      temp_max: baseTemp + 2,
      pressure: 1015,
      humidity: 64
    },
    visibility: 10000,
    wind: {
      speed: 3.6 + Math.random() * 5,
      deg: Math.floor(Math.random() * 360)
    },
    clouds: {
      all: Math.floor(Math.random() * 100)
    },
    dt: Math.floor(Date.now() / 1000),
    sys: {
      type: 2,
      id: generateCityId(city),
      country: country || 'Unknown',
      sunrise: Math.floor(Date.now() / 1000) - 21600,
      sunset: Math.floor(Date.now() / 1000) + 21600
    },
    timezone: Math.floor(Math.random() * 12) * 3600,
    id: generateCityId(city),
    name: city.charAt(0).toUpperCase() + city.slice(1),
    cod: 200
  };
}

function generateWeather(lat) {
  const conditions = ['Clear', 'Clouds', 'Rain', 'Drizzle', 'Thunderstorm', 'Snow', 'Mist'];
  const condition = conditions[Math.floor(Math.random() * conditions.length)];
  return {
    id: 800,
    main: condition,
    description: condition.toLowerCase(),
    icon: '01d'
  };
}

function generateForecastList(coords) {
  return Array.from({ length: 40 }).map((_, i) => ({
    dt: Math.floor(Date.now() / 1000) + i * 10800,
    main: {
      temp: 293 + Math.random() * 5,
      feels_like: 293 + Math.random() * 5,
      pressure: 1013,
      humidity: 60
    },
    weather: [generateWeather(coords.lat)],
    clouds: { all: Math.floor(Math.random() * 100) },
    wind: { speed: Math.random() * 5, deg: Math.floor(Math.random() * 360) },
    dt_txt: new Date(Date.now() + i * 10800000).toISOString()
  }));
}

function generateHistoricalData(lat) {
  return Array.from({ length: 5 }).map((_, i) => ({
    date: new Date(Date.now() - i * 86400000).toISOString(),
    temperature: 293 + Math.random() * 5
  }));
}

function generateCityId(city) {
  return city.toLowerCase().replace(' ', '_');
}

// Example of running the fetch function automatically for weather updates
const automaticWeatherUpdates = async (city) => {
  try {
    const weather = await fetchWeatherByCity(city);
    console.log('Weather Update:', weather);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
};

// Example of setting automatic updates every 10 minutes for a city
setInterval(() => {
  automaticWeatherUpdates('chennai');
}, 10 * 60 * 1000);  // 10 minutes interval
