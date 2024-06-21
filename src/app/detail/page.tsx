'use client';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { fetchWeather } from '@/utils/fetch_weather';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { WeatherData } from '@/models/weather';

const Details = () => {
  const params: any = useSearchParams();
  const city = params.get('city');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (city) {
      const getWeather = async () => {
        try {
          const data = await fetchWeather(city as string);
          setWeatherData(data);
          setError(null);
        } catch (error) {
          setWeatherData(null);
          setError('Weather data not available');
        }
      };
      getWeather();
    }
  }, [city]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div>
        <title>Weather Details</title>
      </div>

      <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-4xl font-bold mb-8">Weather Details</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {weatherData && (
          <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">{weatherData.name}</h2>
            <div className="flex items-center justify-center mb-4">
              <Image
                width={100}
                height={100}
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt="Weather Icon"
              />
              <div className="text-4xl ml-4">
                {Math.round(weatherData.main.temp)}°C
              </div>
            </div>

            <p className="text-gray-600 mb-2">
              Feels like: {Math.round(weatherData.main.feels_like)}°C
            </p>
            <p className="text-gray-600 mb-2">
              Weather: {weatherData.weather[0].description}
            </p>
            <p className="text-gray-600 mb-2">
              Humidity: {weatherData.main.humidity}%
            </p>
            <p className="text-gray-600 mb-2">
              Pressure: {weatherData.main.pressure} hPa
            </p>
            <p className="text-gray-600 mb-2">
              Wind speed: {weatherData.wind.speed} m/s
            </p>
            <p className="text-gray-600 mb-2">
              Visibility: {weatherData.visibility / 1000} km
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
