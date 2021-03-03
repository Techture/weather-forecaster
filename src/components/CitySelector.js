import React, { useEffect } from "react";
import Tagline from "./Tagline";
import updateCityName from "./UpdateCityName";
import { FaArrowRight } from "react-icons/fa";
import { FormControl, Button } from "react-bootstrap";

const CitySelector = ({ onSearch, userLocation, setUserLocation }) => {
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
        name={userLocation.name}
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
