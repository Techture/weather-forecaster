import React from "react";
import FormatTime from "../utils/FormatTime";
import Accordion from "../components/Accordion";

const HourlyWeather = ({ hourlyWeather, timezone, city }) => {
  let cityFormatter = city
    .split("/")
    .slice(1, 2)
    .join(" ")
    .split("_")
    .join(" ");

  const roundTemp = (tempToRound) => {
    return Math.round(tempToRound);
  };

  const formatTime = (timeToFormat) => {
    return FormatTime(timeToFormat, timezone, "hA");
  };

  const formatDate = (dateToFormat) => {
    return FormatTime(dateToFormat, timezone, "MM/DD");
  };

  return (
    <div className="hourly-weather-data">
      <p className="hourly-weather-tagline">
        48 Hour Forecast |
        <span className="hourly-weather-data-city"> {cityFormatter}</span>
      </p>

      <Accordion title={"Click To View >>"} isExpand={false}>
        <div className="hourly-weather-data-box">
          {hourlyWeather.map((hour, idx) => {
            return (
              <span className="hourly-weather-data-property" key={idx}>
                <p className="weather-data-title">
                  Date | Time | Temp | Feels Like | Conditions
                </p>
                <p className="weather-data-value">
                  {formatDate(hour.dt)} | {formatTime(hour.dt)} |{" "}
                  {roundTemp(hour.temp)}&#176; | {roundTemp(hour.feels_like)}
                  &#176; | {hour.weather[0].main}
                  <img
                    className="daily-weather-data-icon"
                    src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                    alt=""
                  />
                </p>
              </span>
            );
          })}
        </div>
      </Accordion>
    </div>
  );
};

export default HourlyWeather;
