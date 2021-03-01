import React, { useEffect, useState } from "react";
import Tagline from "./Tagline";
import updateCityName from "./UpdateCityName";
import { FaArrowRight } from "react-icons/fa";
import { FormControl, Button } from "react-bootstrap";

const CitySelector = ({ onSearch }) => {
  const [userLocation, setUserLocation] = useState({
    lat: null,
    lon: null,
    name: "",
  });

  useEffect(() => {
    const localUserLocation = localStorage.getItem("user location");
    if (localUserLocation) {
      setUserLocation(JSON.parse(localUserLocation));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user location", JSON.stringify(userLocation));
  });

  const onKeyDown = (event) => {
    if (event.keyCode === 13) {
      updateCityName(userLocation.name, setUserLocation);
      setUserLocation(userLocation);
      onSearch(userLocation.lat, userLocation.lon);
    }
  };

  return (
    <div className="weather-search">
      <Tagline />
      <FormControl
        className="weather-search-form weather-search-input"
        placeholder="Enter a city"
        onChange={(event) => setUserLocation({ name: event.target.value })}
        value={userLocation.name}
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
