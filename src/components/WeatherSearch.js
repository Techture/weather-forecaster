import React from "react";
import Tagline from "./Tagline";

const WeatherSearch = ({ fetchWeatherData, city }) => {
  return (
    <>
      <div className="weather-search">
        <form onSubmit={fetchWeatherData} className="weather-search-form">
          <Tagline />
          <input
            className="weather-search-input"
            autoComplete="off"
            name="city"
            type="text"
            placeholder={city}
          />
          <div className="weather-search-submit">
            <button className="weather-search-button">&#10140;</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default WeatherSearch;
