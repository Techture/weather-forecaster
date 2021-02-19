import React from "react";
import DateTime from "../components/DateTime";

const CurrentWeather = ({ city, temp, temp_max, temp_min, conditions }) => {
  return (
    <div className="current-weather-data">
      <p className="current-weather-tagline">
        Current Forecast |{" "}
        <span className="current-weather-data-city">{city}</span>
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
