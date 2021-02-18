import React from "react";
import Tagline from "./Tagline";

const WeatherSearch = ({ fetchData, city }) => {
  return (
    <>
      <div className="weather-search">
        <form onSubmit={fetchData} className="weather-search-form">
          <Tagline />
          <input
            autoComplete="on"
            name="city"
            className="weather-search-input"
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
