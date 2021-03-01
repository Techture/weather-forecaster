import fetchWeatherData from "./FetchWeatherData";

const GetCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      let newUserCoords = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      };
      return fetchWeatherData(newUserCoords.lat, newUserCoords.lon);
    });
  } else {
    console.log("Geolocation not suppported");
  }
};

export default GetCurrentLocation;
