import React from "react";
import DailyWeather from "./DailyWeather";

const DailyWeatherList = ({ dailyWeather, timezone, city }) => {
  return (
    <DailyWeather dailyWeather={dailyWeather} timezone={timezone} city={city} />
  );
};

export default DailyWeatherList;
