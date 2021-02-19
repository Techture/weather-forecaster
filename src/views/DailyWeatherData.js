import React from "react";
import DailyWeather from "./DailyWeather";

const DailyWeatherData = ({ dailyWeather, timezone, city }) => {
  return (
    <DailyWeather dailyWeather={dailyWeather} timezone={timezone} city={city} />
  );
};

export default DailyWeatherData;
