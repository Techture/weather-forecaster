import React, { useState, useEffect } from "react";
import Header from "../views/layout/Header";
import CitySelector from "../components/CitySelector";
import Weather from "../components/Weather";
import Footer from "../views/layout/Footer";
import fetchWeatherData from "../utils/FetchWeatherData";

const Main = () => {
  const [weatherData, setWeatherData] = useState(null);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let newUserCoords = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        fetchWeatherData(newUserCoords.lat, newUserCoords.lon, setWeatherData);
      });
    } else {
      console.log("Geolocation not suppported");
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <>
      <div className="main">
        <Header />

        <CitySelector
          onSearch={(lat, lon, name) =>
            fetchWeatherData(lat, lon, setWeatherData)
          }
          data={weatherData}
        />

        {weatherData && <Weather data={weatherData} />}
      </div>
      <Footer />
    </>
  );
};

export default Main;
