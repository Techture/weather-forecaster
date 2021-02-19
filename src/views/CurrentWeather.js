import React from "react";
import DateTime from "../components/DateTime";

const CurrentWeather = ({
  city,
  temp,
  temp_max,
  temp_min,
  conditions,
  icon,
}) => {
  return (
    <div className="current-weather-data">
      <p className="weather-tagline">
        Current forecast for <span className="weather-data-city">{city}</span>
      </p>
      <DateTime />
      <div className="weather-data-box">
        <span className="weather-data-property">
          <p className="weather-data-title">Temperature</p>
          <p className="current-weather-data-value">{temp}&#176;</p>
        </span>
        <span className="weather-data-property">
          <p className="weather-data-title">Conditions</p>
          <p className="current-weather-data-value">{conditions}</p>
        </span>
      </div>
    </div>
  );
};

export default CurrentWeather;
