import React from "react";
import FormatTime from "../utils/FormatTime";

const Weather = ({ city, timezone, hourlyWeather }) => {
  const roundTemp = (tempToRound) => {
    return Math.round(tempToRound);
  };

  const formattedTime = (timeToFormat) => {
    return FormatTime(timeToFormat, timezone, "hA");
  };
  return (
    <div className="weather-data">
      <p className="weather-tagline">
        Hourly Weather for <span className="weather-data-city">{timezone}</span>
      </p>
      <div className="weather-data-box">
        {hourlyWeather.map((hour, idx) => {
          return (
            <span className="weather-data-property" key={idx}>
              <p className="weather-data-title">Time</p>
              <p className="weather-data-value">{formattedTime(hour.dt)}</p>
              <p className="weather-data-title">Temperature</p>
              <p className="weather-data-value">{roundTemp(hour.temp)}</p>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Weather;
