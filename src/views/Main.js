import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../views/layout/Header";
import CurrentWeatherData from "../views/CurrentWeatherData";
import HourlyWeatherData from "../views/HourlyWeatherData";
import DailyWeatherData from "../views/DailyWeatherData";
import Error from "../components/Error";
import Footer from "../views/layout/Footer";

// api key is provided for the review, and will be deleted when review is complete
const API_KEY = "f4d7207b99b6170b521b3903384b9293";

const Main = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyWeather, setHourlyWeather] = useState(null);
  const [dailyWeather, setDailyWeather] = useState(null);
  const [timezone, setTimezone] = useState(null);
  const [city, setCity] = useState(null);
  const [conditions, setConditions] = useState(null);
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

          // format the value of timezone to get just the city
          let cityFormatter = d.timezone
            .split("/")
            .slice(1, 2)
            .join(" ")
            .split("_")
            .join(" ");

          setCurrentWeather(d.current);
          setHourlyWeather(d.hourly);
          setDailyWeather(d.daily);
          setTimezone(d.timezone);
          setCity(cityFormatter);
          setConditions(d.current.weather[0].main);
          setError(null);
        });
      });
    }
  };

  // fetchWeatherData is passed into the WeatherSearch component and used on submission of the the form
  const fetchWeatherData = async (e) => {
    try {
      e.preventDefault();

      const location = e.target.elements.city.value;

      if (!location && !city) {
        return (
          setError("Please enter the name of a city") + setCurrentWeather(null)
        );
      }

      // use onecall endpoint for current, hourly and daily weather info
      const url = `https://api.openweathermap.org/data/2.5/onecall?${location}&appid=${API_KEY}&units=imperial`;

      const request = axios.get(url);
      const { data } = await request;

      setCurrentWeather(data.current);
      setHourlyWeather(data.hourly);
      setDailyWeather(data.daily);
      setTimezone(data.timezone);
      setConditions(data.current.weather[0].main);
      setCity(data.name);
      setError(null);

      console.log("DATA 2 >>", data);
    } catch (err) {
      console.log(err);
    }
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
  });

  return (
    <>
      <div className="main">
        <Header />
        {error !== null && <p>{<Error error={error} />}</p>}
        {currentWeather !== null && (
          <CurrentWeatherData
            currentWeather={currentWeather}
            conditions={conditions}
            city={city}
          />
        )}

        {dailyWeather !== null && (
          <DailyWeatherData
            dailyWeather={dailyWeather}
            timezone={timezone}
            city={city}
          />
        )}

        {hourlyWeather !== null && (
          <HourlyWeatherData
            hourlyWeather={hourlyWeather}
            timezone={timezone}
            city={city}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default Main;
