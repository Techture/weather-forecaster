import React, { useEffect } from "react";
import { API_KEY, API_BASE_URL } from "../apis/config";
import useFetch from "../hooks/UseFetch";
import DailyWeather from "../views/DailyWeather";
import HourlyWeather from "../views/HourlyWeather";
import CurrentWeather from "../views/CurrentWeather";

const Weather = () => {
  const { data, error, isLoading, setUrl } = useFetch();

  // TODO use geolocation to load data from users lat/lng
  // this useEffect loads some placeholder data for testing
  useEffect(() => {
    setUrl(
      `${API_BASE_URL}/data/2.5/onecall?lat=${40.6501}&lon=${-73.94958}&appid=${API_KEY}&units=imperial`
    );
  }, []);

  if (error) return <h2>Sorry, {error}.</h2>;
  if (!data && isLoading) return <h2 className="error">Loading...</h2>;
  if (!data) return null;
  return (
    <>
      <CurrentWeather currentWeather={data.current} city={data.timezone} />
      <DailyWeather dailyWeather={data.daily} city={data.timezone} />
      <HourlyWeather hourlyWeather={data.hourly} city={data.timezone} />
    </>
  );
};

export default Weather;
