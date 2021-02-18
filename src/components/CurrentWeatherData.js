import React from "react";
import CurrentWeather from "./CurrentWeather";

const CurrentWeatherData = ({ currentWeather, city, conditions, icon }) => {
  const { temp } = currentWeather;

  const roundedTemp = Math.round(temp);

  return (
    <CurrentWeather
      temp={roundedTemp}
      city={city}
      conditions={conditions}
      icon={icon}
    />
  );
};

export default CurrentWeatherData;
