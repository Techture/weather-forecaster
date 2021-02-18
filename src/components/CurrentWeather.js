import React from "react";
import DateTime from "./DateTime";

const Weather = ({ city, temp, temp_max, temp_min, conditions, icon }) => {
  return (
    <div className="weather-data">
      <p className="weather-tagline">
        Current forecast for <span className="weather-data-city">{city}</span>
      </p>
      <DateTime />
      <div className="weather-data-box">
        <span className="weather-data-property">
          <p className="weather-data-title">Temperature</p>
          <p className="weather-data-value">{temp}</p>
        </span>
        <span className="weather-data-property">
          <p className="weather-data-title">Conditions</p>
          <p className="weather-data-value">{conditions}</p>
        </span>
      </div>
    </div>
  );
};

export default Weather;
