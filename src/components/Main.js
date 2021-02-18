import React, { useState, useEffect } from "react";
import axios from "axios";
import Context from "../Context";
import { apiKey } from "../secrets";
import Header from "./Layout/Header";
import Content from "./Layout/Content";
// import WeatherSearch from "./WeatherSearch";
import CurrentWeatherData from "./CurrentWeatherData";
import HourlyWeatherData from "./HourlyWeatherData";
import Error from "./Error";
import FormatTime from "../utils/FormatTime";
// import Footer from "./Layout/Footer";

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

  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyWeather, setHourlyWeather] = useState([]);
  // const [dailyWeather, setDailyWeather] = useState(null);
  const [timezone, setTimezone] = useState("");
  const [city, setCity] = useLocalState("city");
  const [conditions, setConditions] = useState(null);
  const [icon, setIcon] = useState(null);
  const [error, setError] = useState(null);

  const fetchLocation = () => {
    let weatherCurrent = {};
    let weatherForecast = {};

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let pos = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${pos.latitude}&lon=${pos.longitude}&appid=${API_KEY}&units=imperial`;

        axios.get(url).then((res) => {
          let d = res.data;

          weatherCurrent = {
            timezone,
            ...d.currently,
          };

          let timeFrames = {};

          // format hourly data
          hourlyWeather.forEach((hour) => {
            const date = FormatTime(hour.dt, timezone, "hA");
            if (Object.keys(timeFrames).includes(date)) {
              timeFrames[date].push({ timezone, ...hour });
            } else {
              timeFrames[date] = [{ timezone, ...hour }];
            }
            console.log("HOURLY WEATHER >>", date);
          });

          setCurrentWeather(d.current);
          setHourlyWeather(d.hourly);
          setTimezone(d.timezone);

          // console.log("hourly >>", d.timezone);

          // setDailyWeather(d.daily);
          setConditions(d.current.weather[0].main);
          setCity(d.timezone);
          // setIcon(d.weather[0].icon);

          console.log("DATA 1 >>", d);

          return {
            weatherCurrent,
            weatherForecast,
          };
        });
      });
    }
  };

  const fetchData = async (e) => {
    e.preventDefault();

    const location = e.target.elements.city.value;
    if (!location && !city) {
      return (
        setError("Please enter the name of a city") + setCurrentWeather(null)
      );
    }

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

  // const useMountEffect = (fun) => useEffect(fun, []);
  // useMountEffect(fetchLocation);

  useEffect(() => {
    fetchLocation();
  }, []);

  return (
    <div className="main">
      <Header />
      <Content>
        <Context.Provider
          value={{
            fetchData,
            currentWeather,
            hourlyWeather,
            timezone,
            city,
            conditions,
            icon,
          }}
        >
          {/* <WeatherSearch /> */}
          {error !== null && <p>{<Error error={error} />}</p>}
          {currentWeather !== null && <CurrentWeatherData />}
          {hourlyWeather !== null && <HourlyWeatherData />}
        </Context.Provider>
        {/* <Footer /> */}
      </Content>
    </div>
  );
};

export default Main;
