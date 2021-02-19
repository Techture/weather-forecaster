import React from "react";
import FormatTime from "../utils/FormatTime";

const Weather = ({ city, timezone, hourlyWeather }) => {
  // round the decimal from hourlyWeather.temp
  const roundTemp = (tempToRound) => {
    return Math.round(tempToRound);
  };

  // format time from hourlyWeather[0].dt
  const formatTime = (timeToFormat) => {
    return FormatTime(timeToFormat, timezone, "hA");
  };

  // format date from hourlyWeather[0].dt
  const formatDate = (timeToFormat) => {
    return FormatTime(timeToFormat, timezone, "MM/DD/YYYY");
  };

  return (
    <div className="hourly-weather-data">
      <p className="weather-tagline">
        Hourly forecast for the next 48 hours{" "}
        <span className="weather-data-city">{timezone}</span>
      </p>
      <div className="hourly-weather-data-box">
        {hourlyWeather.map((hour, idx) => {
          return (
            <span className="weather-data-property" key={idx}>
              <p className="weather-data-title">
                Date | Time | Temperature | Conditions
              </p>
              <p className="weather-data-value">
                {formatDate(hour.dt)} - {formatTime(hour.dt)} -{" "}
                {roundTemp(hour.temp)}&#176; - {hour.weather[0].main}
              </p>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Weather;
