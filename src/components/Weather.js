import React from "react";
import CurrentWeather from "../views/CurrentWeather";
import DailyWeather from "../views/DailyWeather";
import HourlyWeather from "../views/HourlyWeather";

const Weather = ({ data, city }) => {
  console.log("data timezone >> ", data);
  return (
    <>
      {data && (
        <>
          <CurrentWeather currentWeather={data.current} city={city} />
          <DailyWeather dailyWeather={data.daily} city={city} />
          <HourlyWeather hourlyWeather={data.hourly} city={city} />
        </>
      )}
    </>
  );
};

export default Weather;
