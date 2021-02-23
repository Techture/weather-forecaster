import { API_KEY, API_BASE_URL } from "../apis/config";
import axios from "axios";

const FetchWeatherData = (latitude, longitude) => {
  return axios
    .get(
      `${API_BASE_URL}/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=imperial`
    )
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log("error >>", err);
    });
};

export default FetchWeatherData;
