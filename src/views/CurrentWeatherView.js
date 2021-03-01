import React from "react";
import DateTime from "../utils/DateTime";
import cityFormatter from "../utils/CityFormatter";

const CurrentWeather = ({ city, temp, feels_like, conditions, icon }) => {
  return (
    <div className="current-weather-data">
      <p className="current-weather-tagline">
        Current Forecast |{" "}
        <span className="current-weather-data-city">{cityFormatter(city)}</span>
      </p>
      <DateTime />
      <div className="weather-data-box">
        <span className="weather-data-property">
          <p className="weather-data-title">Temperature</p>
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
        <span className="weather-data-property"></span>
      </div>
    </div>
  );
};

export default CurrentWeather;
