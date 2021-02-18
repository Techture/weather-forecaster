import React from "react";
import FormatTime from "../utils/FormatTime";

const Weather = ({ city, timezone, hourlyWeather }) => {
  const roundTemp = (tempToRound) => {
    return Math.round(tempToRound);
  };

  const formattedTime = (timeToFormat) => {
    return FormatTime(timeToFormat, timezone, "hA");
  };

  const formattedDate = (timeToFormat) => {
    return FormatTime(timeToFormat, timezone, "MM/DD/YYYY");
  };

  return (
    <div className="weather-data">
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
                {formattedDate(hour.dt)} - {formattedTime(hour.dt)} -{" "}
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
