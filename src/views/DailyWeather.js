import React from "react";
import FormatTime from "../utils/FormatTime";
import Accordion from "../components/Accordion";

const DailyWeather = ({ dailyWeather, timezone, city }) => {
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
    <div className="daily-weather-data">
      <p className="daily-weather-tagline">
        8 Day Forecast |<span className="daily-weather-data-city"> {city}</span>
      </p>

      <Accordion title={"Click To View >>"} isExpand={false}>
        <div className="daily-weather-data-box">
          {dailyWeather.map((day, idx) => {
            return (
              <span className="daily-weather-data-property" key={idx}>
                <p className="weather-data-title">
                  Date | Time | Temp | Conditions
                </p>
                <p className="weather-data-value">
                  {formatDate(day.dt)} | {formatTime(day.dt)} |{" "}
                  {roundTemp(day.temp.day)}&#176; | {day.weather[0].main}
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
