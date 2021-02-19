import React from "react";
import FormatTime from "../utils/FormatTime";
import Accordion from "../components/Accordion";

const DailyWeather = ({ timezone, dailyWeather, toggle, title }) => {
  // const { title } = props;

  // round the decimal from dailyWeather.temp
  const roundTemp = (tempToRound) => {
    return Math.round(tempToRound);
  };

  // format time from hourlyWeather[0].dt
  const formatTime = (timeToFormat) => {
    return FormatTime(timeToFormat, timezone, "hA");
  };

  // format date from hourlyWeather[0].dt
  const formatDate = (dateToFormat) => {
    return FormatTime(dateToFormat, timezone, "MM/DD/YYYY");
  };
  return (
    <div className="weather-data">
      <p className="daily-weather-tagline">
        8 Day Forecast |{" "}
        <span className="daily-weather-data-city">{timezone}</span>
      </p>
      <Accordion title={"Click to view >>"}>
        <div className="daily-weather-data-box">
          {dailyWeather.map((day, idx) => {
            return (
              <span className="daily-weather-data-property" key={idx}>
                <p className="weather-data-title">
                  Date | Time | Temperature | Conditions
                </p>
                <p className="daily-weather-data-value">
                  {formatDate(day.dt)} - {formatTime(day.dt)} -{" "}
                  {roundTemp(day.temp.day)}&#176; - {day.weather[0].main}
                </p>
              </span>
            );
          })}
        </div>
      </Accordion>
    </div>
  );
};

export default DailyWeather;
