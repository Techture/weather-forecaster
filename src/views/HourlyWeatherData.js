import React from "react";
import HourlyWeather from "./HourlyWeather";

const HourlyWeatherData = ({ hourlyWeather, timezone }) => {
  return <HourlyWeather hourlyWeather={hourlyWeather} timezone={timezone} />;
};

export default HourlyWeatherData;
