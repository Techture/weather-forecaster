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
  const [hourlyWeather, setHourlyWeather] = useState([]);
  const [dailyWeather, setDailyWeather] = useState([]);
  const [timezone, setTimezone] = useState("");
  const [city, setCity] = useState("");
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
          console.log("D >> ", d);

          setCurrentWeather(d.current);
          setHourlyWeather(d.hourly);
          setDailyWeather(d.daily);
          setTimezone(d.timezone);
          setConditions(d.current.weather[0].main);
          setCity(d.timezone);
        });
      });
    }
  };

  // fetchWeatherData is passed into the WeatherSearch component and used on submission of the the form
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
  });

  return (
    <>
      <div className="main">
        <Header />

        {error !== null && <p>{<Error error={error} />}</p>}
        {currentWeather !== null && (
          <CurrentWeatherData
            currentWeather={currentWeather}
            city={city}
            conditions={conditions}
          />
        )}

        {dailyWeather !== null && (
          <DailyWeatherData
            dailyWeather={dailyWeather}
            timezone={timezone}
            conditions={conditions}
          />
        )}

        {hourlyWeather !== null && (
          <HourlyWeatherData
            hourlyWeather={hourlyWeather}
            timezone={timezone}
            conditions={conditions}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default Main;
