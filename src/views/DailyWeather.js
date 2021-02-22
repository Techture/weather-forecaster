import React from "react";
import DailyWeatherView from "./DailyWeatherView";

const DailyWeather = ({ dailyWeather, timezone, city }) => {
  return (
    <DailyWeatherView
      dailyWeather={dailyWeather}
      timezone={timezone}
      city={city}
    />
  );
};

export default DailyWeather;
