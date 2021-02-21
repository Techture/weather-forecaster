import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../views/layout/Header";
import WeatherSearch from "../components/WeatherSearch";
import CurrentWeatherData from "../views/CurrentWeatherData";
import HourlyWeatherData from "../views/HourlyWeatherData";
import DailyWeatherData from "../views/DailyWeatherData";
import Error from "../components/Error";
import Footer from "../views/layout/Footer";

// list of cities
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
  const [city, setCity] = useState(null);
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
          };

          setUserLocation({ userLocation: fetchedPostion });

          // use onecall endpoint for current, hourly and daily weather info
          const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${fetchedPostion.latitude}&lon=${fetchedPostion.longitude}&appid=${API_KEY}&units=imperial`;

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
    } catch (err) {
      console.log(err);
    }
  };

  // fetchWeatherData is passed into the WeatherSearch component and used on submission of the the form
  const fetchWeatherData = async (e) => {
    try {
      e.preventDefault();

      let location = e.target.elements.city.value;
      // console.log("location >>", location);
      // console.log("cities >>", cities);

      if (!location && !city) {
        return (
          setError("Please enter the name of a city") + setCurrentWeather(null)
        );
      }

      // for (const cityScan of cities) {
      //   return console.log(
      //     `city: ${cityScan.name} lat: ${cityScan.lat} long: ${cityScan.lng}`
      //   );

      // TODO
      // create a function that takes the name of the city a user types in, and filters out the matching city name, updating the lat/long props of that city, which will be passed as two existing properties into the url, pulling that city's data into the UI.

      // const getCity = (cityToGet) => {
      //   const filteredCity = cities.filter((c) => {
      //     if (cityToGet === c) {
      //       return cityToGet.name;
      //     }
      //     return console.log(filteredCity);
      //   });
      // };

      // getCity(location);
      // console.log("location >>", location);

      let newLocation = {
        name: cities[0].name,
        latitude: cities[0].lat,
        longitude: cities[0].lng,
      };
      setUserLocation({ userLocation: newLocation });

      // use onecall endpoint for current, hourly and daily weather info
      const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${newLocation.latitude}&lon=${newLocation.longitude}&appid=${API_KEY}&units=imperial`;

      // console.log("userLocation >>", userLocation);
      // console.log("URL >>", url);

      const request = axios.get(url);
      const { data } = await request;

      setCurrentWeather(data.current);
      setHourlyWeather(data.hourly);
      setDailyWeather(data.daily);
      setTimezone(data.timezone);
      setConditions(data.current.weather[0].main);
      setCity(newLocation.name);
      setError(null);
    } catch (err) {
      console.log("fetchWeatherData error >>", err);
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
