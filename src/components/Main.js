import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Layout/Header";
import CurrentWeatherData from "./CurrentWeatherData";
import HourlyWeatherData from "./HourlyWeatherData";
import Error from "./Error";

// api key included to help make the review process simpler. this key will be deleted after the challenge is completed.
const API_KEY = "f4d7207b99b6170b521b3903384b9293";

const Main = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyWeather, setHourlyWeather] = useState([]);
  const [timezone, setTimezone] = useState("");
  const [city, setCity] = useState("");
  const [conditions, setConditions] = useState(null);
  const [icon, setIcon] = useState(null);
  const [error, setError] = useState(null);

  // get user location
  const fetchUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let pos = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        // use onecall endpoint for current, hourly and daily weather info
        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${pos.latitude}&lon=${pos.longitude}&appid=${API_KEY}&units=imperial`;

        axios.get(url).then((res) => {
          let d = res.data;

          setCurrentWeather(d.current);
          setHourlyWeather(d.hourly);
          setTimezone(d.timezone);
          setConditions(d.current.weather[0].main);
          setCity(d.timezone);
        });
      });
    }
  };

  // this function is passed into the WeatherSearch component and used on submission of the the form, in order for a user to fetch weather for that particular city.
  const fetchWeatherData = async (e) => {
    e.preventDefault();

    const location = e.target.elements.city.value;
    if (!location && !city) {
      return (
        setError("Please enter the name of a city") + setCurrentWeather(null)
      );
    }

    // use onecall endpoint for current, hourly and daily weather info
    const url = `https://api.openweathermap.org/data/2.5/onecall?q=${location}&appid=${API_KEY}&units=imperial`;

    const request = axios.get(url);
    const { data } = await request;

    setError(null);
    setCurrentWeather(data.current);
    setCity(data.name);
    setConditions(data.current.weather[0].main);
    setIcon(data.current.weather[0].icon);

    console.log("DATA 2 >>", data);
  };

  useEffect(() => {
    fetchUserLocation();
    const localCityName = localStorage.getItem("city");
    if (localCityName) {
      setCity(JSON.parse(localCityName));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("city", JSON.stringify(city));
    // fetchUserLocation();
  });

  return (
    <div className="main">
      <Header />
      {/* <WeatherSearch fetchWeatherData={fetchWeatherData}/> */}
      {error !== null && <p>{<Error error={error} />}</p>}
      {currentWeather !== null && (
        <CurrentWeatherData
          currentWeather={currentWeather}
          city={city}
          conditions={conditions}
          icon={icon}
        />
      )}
      {hourlyWeather !== null && (
        <HourlyWeatherData hourlyWeather={hourlyWeather} timezone={timezone} />
      )}
    </div>
  );
};

export default Main;
