import React, { useState, useEffect } from "react";
import Header from "../views/layout/Header";
import fetchWeatherData from "../utils/FetchWeatherData";
import CitySelector from "../components/CitySelector";
import Weather from "../components/Weather";
import Footer from "../views/layout/Footer";

const Main = () => {
  const [userLocation, setUserLocation] = useState({
    zip: null,
    name: "",
    lat: null,
    lon: null,
  });
  const [weatherData, setWeatherData] = useState(null);
  const [geolocationLoaded, setGeolocationLoaded] = useState(false);

  useEffect(() => {
    fetchWeatherData(userLocation.lat, userLocation.lon, setWeatherData);
  }, [userLocation]);

  return (
    <>
      <div className="main">
        <Header />

        <CitySelector
          onSearch={(lat, lon, name) =>
            fetchWeatherData(lat, lon, setWeatherData)
          }
          data={weatherData}
          userLocation={userLocation}
          setUserLocation={setUserLocation}
          geolocationLoaded={geolocationLoaded}
          setGeolocationLoaded={setGeolocationLoaded}
        />

        {weatherData && <Weather data={weatherData} city={userLocation.name} />}
      </div>
      <Footer />
    </>
  );
};

export default Main;
