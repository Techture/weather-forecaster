import React, { useEffect } from "react";
import Header from "../views/layout/Header";
import CitySelector from "../components/CitySelector";
import Weather from "../components/Weather";
import Footer from "../views/layout/Footer";
import fetchWeatherData from "../utils/FetchWeatherData";

const Main = () => {
  // get weather data on initial load
  useEffect(() => {
    fetchWeatherData();
  }, []);

  return (
    <>
      <div className="main">
        <Header />
        <CitySelector
          // pass up the current lat/lng of the city that the user types in from CitySelector
          onSearch={(latitude, longitude) =>
            fetchWeatherData(latitude, longitude)
          }
        />
        <Weather />
      </div>
      <Footer />
    </>
  );
};

export default Main;
