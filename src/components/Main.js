import React, { useState, useEffect } from "react";
import axios from "axios";
import Context from "../Context";
import { apiKey } from "../secrets";
import Header from "./Layout/Header";
import Content from "./Layout/Content";
import WeatherSearch from "./WeatherSearch";
import WeatherData from "./WeatherData";
import Error from "./Error";
import Footer from "./Layout/Footer";

const API_KEY = apiKey;

const Main = () => {
  // custom hook for localStorage
  function useLocalState(localItem) {
    const [local, setState] = useState(localStorage.getItem(localItem));

    function setLocal(newItem) {
      localStorage.setItem(localItem, newItem);
      setState(newItem);
    }

    return [local, setLocal];
  }

  // const [userLocation, setUserLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [conditions, setConditions] = useState(null);
  const [icon, setIcon] = useState(null);
  const [city, setCity] = useLocalState("city");
  const [error, setError] = useState(null);

  const fetchLocation = () => {
    // geolocation api
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        //get the lat and long of your device
        let pos = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        // setUserLocation(userLocation);

        // api endpoints
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${pos.latitude}&lon=${pos.longitude}&appid=${API_KEY}&units=imperial`;

        // hourly api
        // const url = `https://pro.openweathermap.org/data/2.5/forecast/hourly?q=London,us&mode=xml&appid=${API_KEY}`;

        axios.get(url).then((res) => {
          let d = res.data;

          // let userWeather = {
          //   temp: d.main.temp,
          //   temp_max: d.main.temp_max,
          //   temp_min: d.main.temp_min,
          //   description: d.weather[0].description,
          //   icon: d.weather[0].icon,
          // };

          setWeather(d.main);
          // setCity(d.name);
          setConditions(d.weather[0].main);
          setIcon(d.weather[0].icon);

          console.log("DATA >>", d);
        });
      });
    }
  };

  const fetchData = async (e) => {
    e.preventDefault();

    const location = e.target.elements.city.value;
    if (!location && !city) {
      return setError("Please enter the name of the city") + setWeather(null);
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=imperial`;

    const request = axios.get(url);
    const { data } = await request;

    setError(null);
    setWeather(data.main);
    setCity(data.name);
    setConditions(data.weather[0].main);
    setIcon(data.weather[0].icon);
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  return (
    <div className="main">
      <Header />
      <Content>
        <Context.Provider
          value={{ fetchData, weather, city, conditions, icon }}
        >
          <WeatherSearch />
          {error !== null && <p>{<Error error={error} />}</p>}
          {weather !== null && <WeatherData />}
        </Context.Provider>
        <Footer />
      </Content>
    </div>
  );
};

export default Main;
