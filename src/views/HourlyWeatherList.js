import React from "react";
import HourlyWeather from "./HourlyWeather";

const HourlyWeatherList = ({ hourlyWeather, timezone, city }) => {
  return (
    <HourlyWeather
      hourlyWeather={hourlyWeather}
      timezone={timezone}
      city={city}
    />
  );
};

export default HourlyWeatherList;
