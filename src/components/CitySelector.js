import React, { useEffect, useState } from "react";
import Tagline from "./Tagline";
import { FaArrowRight } from "react-icons/fa";
import { FormControl, Button } from "react-bootstrap";
import { API_KEY, API_BASE_URL } from "../apis/config";
import axios from "axios";

const CitySelector = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [userLocation, setUserLocation] = useState({
    lat: null,
    lon: null,
    name: "",
  });

  async function updateCityName(cityName) {
    try {
      const { data } = await axios(
        `${API_BASE_URL}geo/1.0/direct?q=${cityName}&appid=${API_KEY}`
      );

      const newUserLocation = {
        lat: data[0].lat,
        lon: data[0].lon,
        name: data[0].name,
      };
      setCity(newUserLocation.name);
      setUserLocation(newUserLocation);
      console.log("New User Location >> ", newUserLocation);
    } catch (error) {
      console.error("Err: Updating City >> ", error);
    }
  }

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
      updateCityName(city);
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
            updateCityName(city);
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
