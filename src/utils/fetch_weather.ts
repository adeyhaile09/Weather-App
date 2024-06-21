import { WeatherData } from '@/models/weather';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;

export const fetchWeather = async (city: string): Promise<WeatherData> => {
  if (!API_KEY) {
    throw new Error('API key is missing');
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error('Weather data not available');
  }

  const data: WeatherData = await response.json();
  return data;
};
