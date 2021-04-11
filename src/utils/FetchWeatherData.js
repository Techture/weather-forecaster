import { API_BASE_URL } from "../apis/config";
import axios from "axios";

let weatherForecasterApiKey;

if (process.env.NODE_ENV !== "production") {
  weatherForecasterApiKey = process.env.REACT_APP_WEATHER_FORECASTER_API_KEY;
} else {
  weatherForecasterApiKey = process.env.WEATHER_FORECASTER_API_KEY;
}

const FetchWeatherData = async (lat, lon, setWeatherData) => {
  try {
    const { data } = await axios(
      `${API_BASE_URL}/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${weatherForecasterApiKey}&units=imperial`
    );
    setWeatherData(data);
  } catch (error) {
    console.log("Error: Fetch Weather >>", error);
  }
};

export default FetchWeatherData;
