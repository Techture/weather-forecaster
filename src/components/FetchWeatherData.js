// import React, { useState, useEffect } from "react";
// import axios from "axios";

// fetchWeatherData is passed into the WeatherSearch component and used on submission of the the form
// const fetchWeatherData = async (e) => {
//   try {
//     e.preventDefault();

//     const location = e.target.elements.city.value;
//     // console.log("location >>", location);

//     if (!location && !city) {
//       return (
//         setError("Please enter the name of a city") + setCurrentWeather(null)
//       );
//     }

//     // helper to match the city names
//     const cleanCityName = (cityName) => {
//       return cityName.toLowerCase();
//     };

//     const updateUserLocation = () => {
//       for (const cityIndex of cities) {
//         if (cleanCityName(cityIndex.name) === cleanCityName(city)) {
//           setCityLocation({
//             latitude: cityIndex.lat,
//             longitude: cityIndex.lng,
//             name: cityIndex.name,
//           });
//           setCity(cityIndex.name);
//         }
//       }
//     };

//     updateUserLocation();

// setCityLocation({ cityLocation: fetchedPostion });

//     const url = `${API_BASE_URL}/data/2.5/onecall?/data/2.5/onecall?lat=${userLocation.latitude}&lon=${userLocation.longitude}&appid=${API_KEY}&units=imperial`;

//     // console.log("URL >>", url);

//     const request = axios.get(url);
//     const { data } = await request;
//     // console.log("DATA 2 >>", data);

//     // format the value of timezone to get just the city
//     let cityFormatter2 = data.timezone
//       .split("/")
//       .slice(1, 2)
//       .join(" ")
//       .split("_")
//       .join(" ");

//     setTimezone(data.timezone);
//     setCity(cityFormatter2);
//     setCurrentWeather(data.current);
//     setHourlyWeather(data.hourly);
//     setDailyWeather(data.daily);
//     setConditions(data.current.weather[0].main);
//     setError("");
//   } catch (err) {
//     console.log(`Fetch Data ${err}`);
//   }
// };
