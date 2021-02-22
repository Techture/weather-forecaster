import React from "react";
import FormatTime from "../utils/FormatTime";

const DailyWeather = ({
  dt,
  dt_txt,
  temp,
  temp_min,
  temp_max,
  main,
  icon,
  city,
}) => {
  const date = new Date(dt);

  console.log("main temp >>", main.temp);
  // // round the decimal from dailyWeather.temp
  const roundTemp = (tempToRound) => {
    return Math.round(tempToRound);
  };

  // format time from hourlyWeather[0].dt
  const formatTime = (timeToFormat) => {
    return FormatTime(timeToFormat, dt_txt, "hA");
  };

  // format date from hourlyWeather[0].dt
  // const formatDate = (dateToFormat) => {
  //   return FormatTime(dateToFormat, timezone, "MM/DD/YYYY");
  // };
  return (
    <span className="daily-weather-data-property">
      <p className="weather-data-title">
        Date | Time | Temperature | Conditions
      </p>
      <p className="daily-weather-data-value">
        {date.toLocaleDateString()} - {formatTime(dt)} - {roundTemp(temp)} -{" "}
        {main}
      </p>
    </span>
  );
};

export default DailyWeather;
