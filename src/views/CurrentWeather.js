import React from "react";
import CurrentWeatherView from "./CurrentWeatherView";

const CurrentWeather = ({ currentWeather, city }) => {
  const { temp, weather, feels_like } = currentWeather;
  const conditions = weather[0].main;
  const icon = weather[0].icon;

  const roundedTemp = Math.round(temp);
  const roundedFeelsLike = Math.round(feels_like);

  console.log("weather >> ", currentWeather);

  return (
    <>
      {currentWeather ? (
        <CurrentWeatherView
          city={city}
          temp={roundedTemp}
          feels_like={roundedFeelsLike}
          conditions={conditions}
          icon={icon}
        />
      ) : (
        <h2>Sorry city data not available.</h2>
      )}
    </>
  );
};

export default CurrentWeather;
