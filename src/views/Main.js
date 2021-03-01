import React, { useState, useEffect } from "react";
import Header from "../views/layout/Header";
import CitySelector from "../components/CitySelector";
import Weather from "../components/Weather";
import Footer from "../views/layout/Footer";
import axios from "axios";

import { API_BASE_URL, API_KEY } from "../apis/config";

const Main = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [userCoords, setUserCoords] = useState({
    latitude: null,
    longitude: null,
  });

  // ** TODO think about how to move the below functions into their own components
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let newUserCoords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setUserCoords({ userCoords: newUserCoords });
        fetchWeatherData(newUserCoords.latitude, newUserCoords.longitude);
      });
    } else {
      console.log("Geolocation not suppported");
    }
  };

  // **
  async function fetchWeatherData(lat, lon) {
    try {
      const { data } = await axios(
        `${API_BASE_URL}/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`
      );
      setWeatherData(data);
    } catch (error) {
      console.log("ERR: Fetch Weather >>", error);
    }
  }

  // **
  async function fetchNewWeatherData(lat, lon) {
    try {
      const { data } = await axios(
        `${API_BASE_URL}data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`
      );

      setWeatherData(data);
    } catch (error) {
      console.log("ERR: Fetch New Weather >>", error);
    }
  }

  // TODO >> setUserLocation here as well as in CitySelector
  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <>
      <div className="main">
        <Header />

        <CitySelector
          onSearch={(lat, lon) => fetchNewWeatherData(lat, lon)}
          data={weatherData}
        />

        <Weather data={weatherData} />

        {/* {weatherData ? (
          <Weather data={weatherData} />
        ) : (
          <h2 className="error">Sorry, that city has no weather data.</h2>
        )} */}
      </div>
      <Footer />
    </>
  );
};

export default Main;
