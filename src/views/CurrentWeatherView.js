import React from "react";
import CurrentWeather from "./CurrentWeather";

const CurrentWeatherView = ({ currentWeather, city }) => {
  const { temp, weather } = currentWeather;
  const conditions = weather[0].main;

  console.log("Current Weather Data >>", currentWeather);
  console.log("City >>", city);

  const roundedTemp = Math.round(temp);

  return (
    <CurrentWeather temp={roundedTemp} city={city} conditions={conditions} />
  );
};

export default CurrentWeatherView;
