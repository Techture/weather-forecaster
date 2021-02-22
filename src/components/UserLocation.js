// get user location
// const fetchUserLocation = async () => {
//   try {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         let fetchedPostion = {
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//           name: "",
//         };

//         setUserLocation({ userLocation: fetchedPostion });

//         // use onecall endpoint for current, hourly and daily weather info
//         const url = `${API_BASE_URL}/data/2.5/onecall?lat=${fetchedPostion.latitude}&lon=${fetchedPostion.longitude}&appid=${API_KEY}&units=imperial`;

//         // const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${fetchedPostion.latitude}&lon=${fetchedPostion.longitude}&appid=${API_KEY}&units=imperial`;

//         // make this an await call like the fetchWeatherData function
//         axios.get(url).then((res) => {
//           let d = res.data;

//           // format the value of timezone to get just the city
//           let cityFormatter = d.timezone
//             .split("/")
//             .slice(1, 2)
//             .join(" ")
//             .split("_")
//             .join(" ");

//           setTimezone(d.timezone);
//           setCurrentWeather(d.current);
//           setHourlyWeather(d.hourly);
//           setDailyWeather(d.daily);
//           setCity(cityFormatter);
//           setConditions(d.current.weather[0].main);
//           setError("");
//         });
//       });
//     }
//   } catch (err) {
//     console.log("Fetch User Location Error >>", err);
//   }
// };
