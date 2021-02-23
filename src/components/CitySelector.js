import React, { useEffect, useState } from "react";
import Tagline from "./Tagline";
import { FaArrowRight } from "react-icons/fa";
import { FormControl, Button } from "react-bootstrap";

// list of cities to pull lat/lng from
import cities from "cities.json";

const CitySelector = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [userLocation, setUserLocation] = useState({
    latitude: 64.128288,
    longitude: -21.827774,
    name: "Reykjavík",
  });

  const updateUserLocation = (cityName) => {
    for (const cityIndex of cities) {
      if (cityIndex.name === cityName) {
        let newUserLocation = {
          latitude: cityName.lat,
          longitude: cityName.lng,
          name: cityName,
        };
        setUserLocation({ userLocation: newUserLocation });
        // console.log("user location after update >> ", userLocation);
      }
    }
  };

  // console.log("user location on load >> ", userLocation);

  // set city in localStorage
  useEffect(() => {
    const localCityName = localStorage.getItem("city");
    if (localCityName) {
      setCity(JSON.parse(localCityName));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("city", JSON.stringify(city));
  });

  const onKeyDown = (event) => {
    if (event.keyCode === 13) {
      onSearch(userLocation.latitude, userLocation.longitude);
    }
  };

  return (
    <div className="weather-search">
      <Tagline />
      <FormControl
        className="weather-search-form weather-search-input"
        placeholder={userLocation.name}
        onChange={(event) => setCity(event.target.value)}
        value={city}
        onKeyDown={onKeyDown}
      />
      <div className="weather-search-submit">
        <Button
          className="weather-search-button"
          onClick={(e) => {
            e.preventDefault();
            updateUserLocation(city);
            onSearch(userLocation.latitude, userLocation.longitude);
          }}
        >
          <FaArrowRight />{" "}
        </Button>
      </div>
    </div>
  );
};

export default CitySelector;
