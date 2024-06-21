'use client';
import { useState } from 'react';
import WeatherCard from './weather_card/page';
import { fetchWeather } from '@/utils/fetch_weather';

export default function Home() {
  const [city, setCity] = useState<string>('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await fetchWeather(city);
      setWeatherData(data);
      setError(null);
    } catch (error) {
      setWeatherData(null);
      setError('Weather data not available');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-4xl font-bold mb-8">Weather App</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none"
          >
            Get Weather
          </button>
        </form>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {weatherData && <WeatherCard weatherData={weatherData} />}
      </main>
    </div>
  );
}
