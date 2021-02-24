import React, { useState, useEffect } from "react";
import Header from "../views/layout/Header";
import CitySelector from "../components/CitySelector";
import Weather from "../components/Weather";
import Footer from "../views/layout/Footer";
// import fetchWeatherData from "../utils/FetchWeatherData";

import { API_BASE_URL, API_KEY } from "../apis/config";

const Main = () => {
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = (latitude, longitude) => {
    fetch(
      `${API_BASE_URL}/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=imperial`
    )
      .then((data) => data.json())
      .then((results) => {
        setWeatherData(results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // get weather data on initial load
  useEffect(() => {
    fetchWeatherData("64.128288", "-21.827774");
    console.log("2. useEffect >>");
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
          cityPlaceholder={weatherData}
        />
        <Weather data={weatherData} />
      </div>
      <Footer />
    </>
  );
};

export default Main;
