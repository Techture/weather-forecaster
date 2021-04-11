import { API_BASE_URL } from "../apis/config";
import axios from "axios";

let weatherForecasterApiKey;

if (process.env.NODE_ENV !== "production") {
  weatherForecasterApiKey = process.env.REACT_APP_WEATHER_FORECASTER_API_KEY;
} else {
  weatherForecasterApiKey = process.env.WEATHER_FORECASTER_API_KEY;
}

export const UpdateCityName = async (cityName, setUserLocation) => {
  try {
    const { data } = await axios(
      `${API_BASE_URL}geo/1.0/direct?q=${cityName}&limit=1&appid=${weatherForecasterApiKey}`
    );

    const newUserLocation = {
      lat: data[0].lat,
      lon: data[0].lon,
      name: data[0].name,
    };

    console.log("new user location >>", newUserLocation);
    setUserLocation(newUserLocation);
  } catch (error) {
    console.log("Error: Updating City Name >> ", error);
  }
};

export default UpdateCityName;
