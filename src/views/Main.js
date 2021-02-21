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
            name: "",
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
      console.log("Fetch User Location Error >>", err);
    }
  };

  // fetchWeatherData is passed into the WeatherSearch component and used on submission of the the form
  const fetchWeatherData = async (e) => {
    try {
      e.preventDefault();

      const location = e.target.elements.city.value;
      console.log("location >>", location);

      if (!location && !city) {
        return (
          setError("Please enter the name of a city") + setCurrentWeather(null)
        );
      }

      // loop through cities list and if the location matches the city, update the lat/long
      // let newLocation = {
      //   latitude: userLocation.latitude,
      //   longitude: userLocation.latitude,
      //   name: "",
      // };

      // TODO >> need to make the value/type of cityIndex and location the same
      for (const cityIndex of cities) {
        if (cityIndex.name === location) {
          let newLocation = {
            latitude: cityIndex.lat,
            longitude: cityIndex.lng,
            name: cityIndex.name,
          };
          setUserLocation({ userLocation: newLocation });
          console.log("name: ", userLocation.name);
        }
      }

      // TODO
      // create a function that takes the location value we receive from the search form, and filters out the matching city name, updating the lat/long props of that city, which will be passed as the two existing lat/lng properties into the url, pulling that city's data into the UI.

      // let filteredCity = cities.filter((c)  {
      //   if (cityToGet === c) {
      //     return cityToGet.name;
      //   }
      //   return console.log(filteredCity);
      // });

      // use onecall endpoint for current, hourly and daily weather info
      const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${userLocation.latitude}&lon=${userLocation.longitude}&appid=${API_KEY}&units=imperial`;

      // console.log("userLocation >>", userLocation);
      // console.log("URL >>", url);

      const request = axios.get(url);
      const { data } = await request;

      setTimezone(data.timezone);
      setCity(data.name);
      setCurrentWeather(data.current);
      setConditions(data.current.weather[0].main);
      setHourlyWeather(data.hourly);
      setDailyWeather(data.daily);
      setError(null);
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
