import React from "react";
import CurrentWeather from "./CurrentWeather";

const CurrentWeatherData = ({ currentWeather, city, conditions, icon }) => {
  const { temp, temp_max, temp_min } = currentWeather;

  const roundedTemp = Math.round(temp);
  const roundedTempMax = Math.round(temp_max);
  const roundedTempMin = Math.round(temp_min);

  return (
    <CurrentWeather
      temp={roundedTemp}
      temp_max={roundedTempMax}
      temp_min={roundedTempMin}
      city={city}
      conditions={conditions}
      icon={icon}
    />
  );
};

export default CurrentWeatherData;
