import React from "react";
import CurrentWeather from "../views/CurrentWeather";
// import DailyWeather from "../views/DailyWeather";
// import HourlyWeather from "../views/HourlyWeather";

const Weather = ({ data }) => {
  console.log("current weather >> ", data);
  return (
    <>
      {data ? (
        <>
          <CurrentWeather currentWeather={data.current} city={data.timezone} />
          {/* <DailyWeather dailyWeather={data.daily} city={data.timezone} /> */}
          {/* <HourlyWeather hourlyWeather={data.hourly} city={data.timezone} /> */}
        </>
      ) : (
        <h1 className="error">Please enter another city.</h1>
      )}
    </>
  );
};

export default Weather;
