import React from "react";
import DailyWeather from "../views/DailyWeather";
import HourlyWeather from "../views/HourlyWeather";
import CurrentWeather from "../views/CurrentWeather";

const Weather = ({ data }) => {
  // TODO use geolocation to load data from users lat/lng
  // this useEffect loads some placeholder data for testing

  console.log("Data >> ", data);

  return (
    <>
      {data ? (
        <>
          <CurrentWeather currentWeather={data.current} city={data.timezone} />
          <DailyWeather dailyWeather={data.daily} city={data.timezone} />
          <HourlyWeather hourlyWeather={data.hourly} city={data.timezone} />
        </>
      ) : null}
    </>
  );
};

export default Weather;
