import React, { useEffect, useState } from "react";
import Tagline from "./Tagline";
import { FaArrowRight } from "react-icons/fa";
import { FormControl, Button } from "react-bootstrap";

// list of cities to pull lat/lng from
import cities from "cities.json";

const CitySelector = ({ onSearch, cityPlaceholder }) => {
  // const { timezone } = data.timezone;
  console.log("weatherData >>", cityPlaceholder);

  const [city, setCity] = useState("");
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
    name: "",
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
        console.log("3. user location after update >> ", userLocation);
      }
    }
  };

  console.log("1. user location on load >> ", userLocation);

  // set city in localStorage
  useEffect(() => {
    // updateUserLocation(city);
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
    console.log("2. onKeyDown >>", userLocation);
  };

  return (
    <div className="weather-search">
      <Tagline />
      <FormControl
        className="weather-search-form weather-search-input"
        placeholder="Enter a city"
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
