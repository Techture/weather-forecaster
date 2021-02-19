import React from "react";
import DailyWeather from "./DailyWeather";

const DailyWeatherData = ({ dailyWeather, timezone }) => {
  return <DailyWeather dailyWeather={dailyWeather} timezone={timezone} />;
};

export default DailyWeatherData;
