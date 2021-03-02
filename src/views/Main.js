import React, { useState, useEffect } from "react";
import Header from "../views/layout/Header";
import fetchWeatherData from "../utils/FetchWeatherData";
import getCurrentLocation from "../utils/GetCurrentLocation";
import CitySelector from "../components/CitySelector";
import Weather from "../components/Weather";
import Footer from "../views/layout/Footer";

const Main = () => {
  const [userLocation, setUserLocation] = useState({
    lat: null,
    lon: null,
    name: "",
  });
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (!userLocation.name) {
      getCurrentLocation(setUserLocation, setWeatherData);
    }

    fetchWeatherData(userLocation.lat, userLocation.lon, setWeatherData);
  }, [userLocation]);

  //----------------------------------
  useEffect(() => {
    const localUserLocation = localStorage.getItem("user location");
    if (localUserLocation) {
      setUserLocation(JSON.parse(localUserLocation));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user location", JSON.stringify(userLocation));
  });
  //----------------------------------

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
        />

        {weatherData && <Weather data={weatherData} />}
      </div>
      <Footer />
    </>
  );
};

export default Main;
