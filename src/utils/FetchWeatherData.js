import { useState } from "react";
import { API_KEY, API_BASE_URL } from "../apis/config";

const FetchWeatherData = (latitude, longitude) => {
  const [weatherData, setWeatherData] = useState(null);

  fetch(
    `${API_BASE_URL}/data/2.5/onecall?lat=${latitude}&lon=${latitude}&appid=${API_KEY}&units=imperial`
  )
    .then((data) => data.json())
    .then((results) => {
      setWeatherData({ weatherData: results });
      return weatherData;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default FetchWeatherData;
