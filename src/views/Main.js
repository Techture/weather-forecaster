import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../views/layout/Header";
import WeatherSearch from "../components/WeatherSearch";
import CurrentWeatherData from "../views/CurrentWeatherData";
import HourlyWeatherData from "../views/HourlyWeatherData";
import DailyWeatherData from "../views/DailyWeatherData";
import Error from "../components/Error";
import Footer from "../views/layout/Footer";

// list of cities to pull lat/lng from
import cities from "cities.json";

// api key is provided for the review, and will be deleted when review is complete
const API_KEY = "f4d7207b99b6170b521b3903384b9293";

const Main = () => {
  const [userLocation, setUserLocation] = useState({
    latitude: 41,
    longitude: -73,
    name: "",
  });
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyWeather, setHourlyWeather] = useState(null);
  const [dailyWeather, setDailyWeather] = useState(null);
  const [timezone, setTimezone] = useState(null);
  const [city, setCity] = useState("");
  const [conditions, setConditions] = useState(null);
  const [error, setError] = useState(null);

  // get user location
  const fetchUserLocation = async () => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          let fetchedPostion = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            name: "",
          };

          setUserLocation({ userLocation: fetchedPostion });

          // use onecall endpoint for current, hourly and daily weather info
          const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${fetchedPostion.latitude}&lon=${fetchedPostion.longitude}&appid=${API_KEY}&units=imperial`;

          // make this an await call like the fetchWeatherData function
          axios.get(url).then((res) => {
            let d = res.data;

            // format the value of timezone to get just the city
            let cityFormatter = d.timezone
              .split("/")
              .slice(1, 2)
              .join(" ")
              .split("_")
              .join(" ");

            setTimezone(d.timezone);
            setCurrentWeather(d.current);
            setHourlyWeather(d.hourly);
            setDailyWeather(d.daily);
            setCity(cityFormatter);
            setConditions(d.current.weather[0].main);
            setError("");
          });
        });
      }
    } catch (err) {
      console.log("Fetch User Location Error >>", err);
    }
  };

  // fetchWeatherData is passed into the WeatherSearch component and used on submission of the the form
  const fetchWeatherData = async (e) => {
    try {
      e.preventDefault();

      const location = e.target.elements.city.value;
      // console.log("location >>", location);

      if (!location && !city) {
        return (
          setError("Please enter the name of a city") + setCurrentWeather(null)
        );
      }

      // helper to match the city names
      const cleanCityName = (cityName) => {
        return cityName.toLowerCase();
      };

      for (const cityIndex of cities) {
        if (cleanCityName(cityIndex.name) === cleanCityName(location)) {
          setUserLocation({
            latitude: cityIndex.lat,
            longitude: cityIndex.lng,
            name: cityIndex.name,
          });
          setCity(cityIndex.name);
        }
      }

      const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${userLocation.latitude}&lon=${userLocation.longitude}&appid=${API_KEY}&units=imperial`;

      console.log("URL >>", url);

      const request = axios.get(url);
      const { data } = await request;
      console.log("DATA 2 >>", data);

      // format the value of timezone to get just the city
      let cityFormatter2 = data.timezone
        .split("/")
        .slice(1, 2)
        .join(" ")
        .split("_")
        .join(" ");

      setTimezone(data.timezone);
      setCity(cityFormatter2);
      setCurrentWeather(data.current);
      setHourlyWeather(data.hourly);
      setDailyWeather(data.daily);
      setConditions(data.current.weather[0].main);
      setError("");
    } catch (err) {
      console.log(`Fetch Data ${err}`);
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
        <WeatherSearch fetchWeatherData={fetchWeatherData} city={city} />
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
