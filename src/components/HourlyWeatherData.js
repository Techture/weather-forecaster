import React, { useContext } from "react";
import Context from "../Context";
import HourlyWeather from "./HourlyWeather";

const HourlyWeatherData = () => {
  const { hourlyWeather, timezone } = useContext(Context);

  return <HourlyWeather hourlyWeather={hourlyWeather} timezone={timezone} />;
};

export default HourlyWeatherData;
