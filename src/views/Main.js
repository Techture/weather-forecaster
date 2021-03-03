import React, { useState, useEffect } from "react";
import Header from "../views/layout/Header";
import fetchWeatherData from "../utils/FetchWeatherData";
// import getCurrentLocation from "../utils/GetCurrentLocation";
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
  const [geolocationLoaded, setGeolocationLoaded] = useState(false);

  useEffect(() => {
    const geoLocationFlag = localStorage.getItem("geolocation loaded");
    if (geoLocationFlag) {
      setGeolocationLoaded(JSON.parse(false));
    }

    // if (geolocationLoaded) {
    // getCurrentLocation(setUserLocation, setWeatherData);
    // }

    fetchWeatherData(userLocation.lat, userLocation.lon, setWeatherData);
  }, [userLocation]);

  useEffect(() => {
    localStorage.setItem(
      "geolocation loaded",
      JSON.stringify(geolocationLoaded)
    );
  });

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

        {weatherData && <Weather data={weatherData} />}
      </div>
      <Footer />
    </>
  );
};

export default Main;
