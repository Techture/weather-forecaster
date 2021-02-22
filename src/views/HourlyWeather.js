import React from "react";
import FormatTime from "../utils/FormatTime";
import Accordion from "../components/Accordion";

const HourlyWeather = ({ hourlyWeather, timezone, city }) => {
  console.log("Hourly Weather >>", hourlyWeather);

  // round the decimal from hourlyWeather.temp
  const roundTemp = (tempToRound) => {
    return Math.round(tempToRound);
  };

  // format time from hourlyWeather[0].dt
  const formatTime = (timeToFormat) => {
    return FormatTime(timeToFormat, timezone, "hA");
  };

  // format date from hourlyWeather[0].dt
  const formatDate = (dateToFormat) => {
    return FormatTime(dateToFormat, timezone, "MM/DD");
  };

  return (
    <div className="hourly-weather-data">
      <p className="hourly-weather-tagline">
        48 Hour Forecast |
        <span className="hourly-weather-data-city"> {city}</span>
      </p>

      <Accordion title={"Click To View >>"} isExpand={true}>
        <div className="hourly-weather-data-box">
          {hourlyWeather.map((hour, idx) => {
            return (
              <span className="hourly-weather-data-property" key={idx}>
                <p className="weather-data-title">
                  Date | Time | Temp | Conditions
                </p>
                <p className="weather-data-value">
                  {formatDate(hour.dt)} | {formatTime(hour.dt)} |{" "}
                  {roundTemp(hour.temp)}&#176; | {hour.weather[0].main}
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
