import React, { useContext } from "react";
import Context from "../Context";
import Weather from "./Weather";

const WeatherData = () => {
  const { weather, city, conditions, icon } = useContext(Context);

  const { temp, temp_max, temp_min } = weather;

  const roundedTemp = Math.round(temp);
  const roundedTempMax = Math.round(temp_max);
  const roundedTempMin = Math.round(temp_min);

  return (
    <Weather
      temp={roundedTemp}
      temp_max={roundedTempMax}
      temp_min={roundedTempMin}
      city={city}
      conditions={conditions}
      icon={icon}
    />
  );
};

export default WeatherData;
