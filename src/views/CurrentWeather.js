import React from "react";
import CurrentWeather from "./CurrentWeatherView";

const CurrentWeatherView = ({ currentWeather, city }) => {
  const { temp, weather, feels_like } = currentWeather;
  const conditions = weather[0].main;
  const icon = weather[0].icon;

  const roundedTemp = Math.round(temp);
  const roundedFeelsLike = Math.round(feels_like);

  return (
    <CurrentWeather
      city={city}
      temp={roundedTemp}
      feels_like={roundedFeelsLike}
      conditions={conditions}
      icon={icon}
    />
  );
};

export default CurrentWeatherView;
