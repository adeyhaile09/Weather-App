import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { WeatherData } from '@/models/weather';

interface Props {
  weatherData: WeatherData;
}

const WeatherCard = ({ weatherData }: Props) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/detail?city=${weatherData.name}`);
  };
  return (
    <div
      onClick={handleClick}
      className="cursor-pointer block bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <h2 className="text-xl font-semibold mb-2">{weatherData.name}</h2>
      <div className="flex items-center">
        <Image
          width={40}
          height={40}
          src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
          alt="Weather Icon"
        />
        <span className="text-lg ml-2">
          {Math.round(weatherData.main.temp)}°C
        </span>
      </div>
      <p className="text-gray-600">{weatherData.weather[0].description}</p>
    </div>
  );
};

export default WeatherCard;
