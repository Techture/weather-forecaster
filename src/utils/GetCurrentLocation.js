import fetchWeatherData from "./FetchWeatherData";

const GetCurrentLocation = (setUserLocation, setWeatherData) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      let newUserCoords = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      };
      setUserLocation({
        lat: newUserCoords.lat,
        lon: newUserCoords.lon,
      });
      fetchWeatherData(newUserCoords.lat, newUserCoords.lon, setWeatherData);
    });
  } else {
    console.log("Geolocation not suppported");
  }
};

export default GetCurrentLocation;
