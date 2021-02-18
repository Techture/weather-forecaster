import React from "react";
import HourlyWeather from "./HourlyWeather";

const HourlyWeatherData = ({ hourlyWeather, timezone }) => {
  // const { hourlyWeather, timezone } = useContext(Context);

  return <HourlyWeather hourlyWeather={hourlyWeather} timezone={timezone} />;
};

export default HourlyWeatherData;
