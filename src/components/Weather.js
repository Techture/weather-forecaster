import React from "react";
import DailyWeather from "../views/DailyWeather";
import HourlyWeather from "../views/HourlyWeather";
import CurrentWeather from "../views/CurrentWeather";

const Weather = ({ data }) => {
  return (
    <>
      {data ? (
        <>
          <CurrentWeather currentWeather={data.current} city={data.timezone} />
          <DailyWeather dailyWeather={data.daily} city={data.timezone} />
          <HourlyWeather hourlyWeather={data.hourly} city={data.timezone} />
        </>
      ) : (
        <h1 className="error">Please enter another city.</h1>
      )}
    </>
  );
};

export default Weather;
