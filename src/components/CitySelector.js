import React, { useEffect } from "react";
import Tagline from "./Tagline";
import updateCityName from "./UpdateCityName";
import { FaArrowRight } from "react-icons/fa";
import { FormControl, Button } from "react-bootstrap";

const CitySelector = ({
  onSearch,
  userLocation,
  setUserLocation,
  geolocationLoaded,
  setGeolocationLoaded,
}) => {
  useEffect(() => {
    const localUserLocation = localStorage.getItem("user location");
    const geoLocationFlag = localStorage.getItem("geolocation loaded");
    if (localUserLocation) {
      setUserLocation(JSON.parse(localUserLocation));
      setGeolocationLoaded(JSON.parse(geoLocationFlag));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user location", JSON.stringify(userLocation));
    localStorage.setItem(
      "geolocation loaded",
      JSON.stringify(geolocationLoaded)
    );
  });

  const onKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      updateCityName(userLocation.name, setUserLocation);
      onSearch(userLocation.lat, userLocation.lon);
      setUserLocation(userLocation);
    }
  };

  return (
    <div className="weather-search">
      <Tagline />
      <FormControl
        className="weather-search-form weather-search-input"
        placeholder="Enter a city"
        onChange={(event) => setUserLocation({ name: event.target.value })}
        value={userLocation.name || ""}
        onKeyDown={onKeyDown}
      />
      <div className="weather-search-submit">
        <Button
          className="weather-search-button"
          onClick={(event) => {
            event.preventDefault();
            onSearch(userLocation.lat, userLocation.lon);
            updateCityName(userLocation.name, setUserLocation);
          }}
        >
          <FaArrowRight />{" "}
        </Button>
      </div>
    </div>
  );
};

export default CitySelector;
