import React, { useState, useEffect } from "react";
import Header from "../views/layout/Header";
import CitySelector from "../components/CitySelector";
import Weather from "../components/Weather";
import Footer from "../views/layout/Footer";
// import fetchWeatherData from "../utils/FetchWeatherData";
import axios from "axios";

import { API_BASE_URL, API_KEY } from "../apis/config";

const Main = () => {
  const [weatherData, setWeatherData] = useState(null);

  async function fetchWeatherData(lat, lon) {
    try {
      const { data } = await axios(
        `${API_BASE_URL}/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`
      );

      setWeatherData(data);
      console.log("FETCHED FIRST WEATHER >>", data);
      // return fetchedWeatherData;
    } catch (error) {
      console.log("ERR: Fetch Weather >>", error);
    }
  }

  async function fetchNewWeatherData(lat, lon) {
    try {
      const { data } = await axios(
        `${API_BASE_URL}/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`
      );

      setWeatherData({ weatherData: data });
      console.log("FETCHED NEW WEATHER >>", data);
      // return fetchedWeatherData;
    } catch (error) {
      console.log("ERR: Fetch New Weather >>", error);
    }
  }

  // get weather data on initial load
  useEffect(() => {
    // fetchWeatherData("64.128288", "-21.827774");
    // fetchWeatherData(weatherData.lat, weatherData.lon);
  }, []);

  return (
    <>
      <div className="main">
        <Header />
        <CitySelector
          // make a fetchNewWeatherData function to pass up the current lat/lng of the city that the user types in from CitySelector
          onSearch={(lat, lon) => fetchNewWeatherData(lat, lon)}
          cityPlaceholder={weatherData}
        />
        {weatherData ? <Weather data={weatherData} /> : null}
      </div>
      <Footer />
    </>
  );
};

export default Main;
