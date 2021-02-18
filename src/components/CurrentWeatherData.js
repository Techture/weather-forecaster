import React, { useContext } from "react";
import Context from "../Context";
import CurrentWeather from "./CurrentWeather";

const CurrentWeatherData = () => {
  const { currentWeather, city, conditions, icon } = useContext(Context);

  const { temp, temp_max, temp_min } = currentWeather;

  const roundedTemp = Math.round(temp);
  const roundedTempMax = Math.round(temp_max);
  const roundedTempMin = Math.round(temp_min);

  return (
    <CurrentWeather
      temp={roundedTemp}
      city={city}
      conditions={conditions}
      icon={icon}
    />
  );
};

export default CurrentWeatherData;
