import React from "react";
import DailyWeather from "./DailyWeather";
// import Accordion from "../components/Accordion";

const DailyWeatherData = ({ dailyWeather, city }) => {
  console.log("dailyWeather >> ", dailyWeather);
  return (
    <div className="weather-data">
      <p className="daily-weather-tagline">
        5 Day Forecast | <span className="daily-weather-data-city">{city}</span>
      </p>
      {/* <Accordion title={"Click to view >>"}> */}
      <div className="daily-weather-data-box"></div>
      {dailyWeather.map(({ dt, main, weather }) => (
        <div key={dt}>
          <DailyWeather
            city={city}
            temp={main.temp}
            temp_max={main.temp_max}
            temp_min={main.temp_min}
            dt={dt * 1000}
            main={weather[0].main}
            icon={weather[0].icon}
          />
        </div>
      ))}
      {/* </Accordion> */}
    </div>
  );
};

export default DailyWeatherData;
