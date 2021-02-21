import React from "react";
import Tagline from "./Tagline";
import { FaArrowRight } from "react-icons/fa";

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
            <button className="weather-search-button">
              <FaArrowRight />{" "}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default WeatherSearch;
