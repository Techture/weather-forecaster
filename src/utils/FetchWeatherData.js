import { API_KEY, API_BASE_URL } from "../apis/config";
import axios from "axios";

const FetchWeatherData = async (lat, lon, setWeatherData) => {
  try {
    const { data } = await axios(
      `${API_BASE_URL}/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`
    );
    setWeatherData(data);
  } catch (error) {
    console.log("Error: Fetch Weather >>", error);
  }
};

export default FetchWeatherData;
