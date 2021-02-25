import React, { useEffect, useState } from "react";
import Tagline from "./Tagline";
import { FaArrowRight } from "react-icons/fa";
import { FormControl, Button } from "react-bootstrap";
import { API_KEY, API_BASE_URL } from "../apis/config";

const CitySelector = ({ onSearch, cityPlaceholder }) => {
  console.log("weatherData >>", cityPlaceholder);

  const [city, setCity] = useState("");
  const [userLocation, setUserLocation] = useState({
    lat: null,
    lon: null,
    name: "",
  });

  const updateUserLocation = (cityName) => {
    fetch(
      `${API_BASE_URL}/geo/1.0/direct?q={cityName}&limit={1}&appid=${API_KEY}`
    )
      .then((data) => data.json())
      .then((results) => {
        const newUserLocation = {
          lat: cityName.lat,
          lon: cityName.lon,
          name: cityName,
        };
        setUserLocation({ userLocation: newUserLocation });
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
    // event.preventDefault();
    if (event.keyCode === 13) {
      onSearch(userLocation.lat, userLocation.lon);
    }
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
          onClick={(event) => {
            event.preventDefault();
            updateUserLocation(city);
            onSearch(userLocation.lat, userLocation.lon);
          }}
        >
          <FaArrowRight />{" "}
        </Button>
      </div>
    </div>
  );
};

export default CitySelector;
