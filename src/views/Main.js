import React, { useEffect, useState } from "react";
import Header from "../views/layout/Header";
import { API_KEY, API_BASE_URL } from "../apis/config";
import UseFetch from "../hooks/UseFetch";
import CitySelector from "../components/CitySelector";
import DailyWeather from "./DailyWeather";
import HourlyWeather from "./HourlyWeather";
import CurrentWeatherView from "./CurrentWeather";
import Footer from "../views/layout/Footer";

// list of cities to pull lat/lng from
// import cities from "cities.json";

const Main = ({ userLocation }) => {
  const { data, error, isLoading, setUrl } = UseFetch();

  const getCurrentWeather = () => {
    if (error) return <h2>Sorry, {error}.</h2>;
    if (!data && isLoading) return <h2 className="error">Loading...</h2>;
    if (!data) return null;
    return (
      <>
        <CurrentWeatherView
          currentWeather={data.current}
          city={data.timezone}
        />
        <DailyWeather dailyWeather={data.daily} city={data.timezone} />
        <HourlyWeather hourlyWeather={data.hourly} city={data.timezone} />
      </>
    );
  };

  // TODO convert city value into lat/lng properties to use in the setUrl function
  useEffect(() => {
    setUrl(
      `${API_BASE_URL}/data/2.5/onecall?lat=${40.6501}&lon=${-73.94958}&appid=${API_KEY}&units=imperial`
    );
  }, []);
  return (
    <>
      <div className="main">
        <Header />
        <CitySelector
          // pass up the current lat/lng of the city that the user types in
          onSearch={(city, lat, lng) =>
            setUrl(
              `${API_BASE_URL}/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=imperial`
            )
          }
        />
        {/* funnel weather data from the onecall endpoint */}
        {getCurrentWeather()}
      </div>
      <Footer />
    </>
  );
};

export default Main;
