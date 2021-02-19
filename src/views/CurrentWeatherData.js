import React from "react";
import CurrentWeather from "../views/CurrentWeather";

const CurrentWeatherData = ({ currentWeather, city, conditions }) => {
  const { temp } = currentWeather;

  const roundedTemp = Math.round(temp);

  return (
    <CurrentWeather temp={roundedTemp} city={city} conditions={conditions} />
  );
};

export default CurrentWeatherData;
