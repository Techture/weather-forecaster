import React from "react";
import DateTime from "../utils/DateTime";

const CurrentWeather = ({ city, temp, feels_like, conditions, icon }) => {
  return (
    <div className="current-weather-data">
      <span className="current-weather-tagline">
        <p className="current-weather-data-city">Current Forecast | {city}</p>
      </span>
      <DateTime />
      <div className="weather-data-box">
        <span className="weather-data-property">
          <p className="weather-data-title">Temp</p>
          <p className="current-weather-data-value">{temp}&#176;</p>
        </span>
        <span className="weather-data-property">
          <p className="weather-data-title">Feels Like</p>
          <p className="current-weather-data-value">{feels_like}&#176;</p>
        </span>
        <span className="weather-data-property">
          <p className="weather-data-title">Conditions</p>
          <p className="current-weather-data-value">{conditions}</p>
        </span>
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
      </div>
    </div>
  );
};

export default CurrentWeather;
