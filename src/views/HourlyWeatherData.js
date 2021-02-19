import React from "react";
import HourlyWeather from "./HourlyWeather";

const HourlyWeatherData = ({ hourlyWeather, timezone, city }) => {
  return (
    <HourlyWeather
      hourlyWeather={hourlyWeather}
      timezone={timezone}
      city={city}
    />
  );
};

export default HourlyWeatherData;
