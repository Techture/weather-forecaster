import React, { useEffect, useState } from "react";
import Tagline from "./Tagline";
import { FaArrowRight } from "react-icons/fa";
import { FormControl, Button } from "react-bootstrap";

// list of cities to pull lat/lng from
import cities from "cities.json";

const CitySelector = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [userLocation, setUserLocation] = useState({
    lat: 64.128288,
    lng: -21.827774,
    name: "",
  });

  // as the user types a city, the city is matched with its lat/lng

  // helper to match the city names
  const cleanCityName = (cityName) => {
    return cityName.toLowerCase();
  };

  const updateUserLocation = (cityName) => {
    // const filterCity = cities.filter((c) => c.name === cityName);

    // let newUserLocation = {
    //   lat: filterCity.lat,
    //   lng: filterCity.lng,
    //   name: filterCity.name,
    // };

    // setUserLocation({ userLocation: newUserLocation });
    // setCity(filterCity.name);

    // console.log("filtered city name >>", filterCity.name);
    // return filterCity;

    for (const cityIndex of cities) {
      if (cityIndex.name === cityName) {
        setUserLocation({
          lat: cityIndex.lat,
          lng: cityIndex.lng,
          name: cityIndex.name,
        });
        setCity(cityIndex.name);
        console.log("cityindex name >> ", cityIndex.name);
      }
    }
  };

  // console.log("userlocation >> ", userLocation);

  // set city in localStorage
  useEffect(() => {
    // updateUserLocation("Rome");

    const localCityName = localStorage.getItem("city");

    if (localCityName) {
      setCity(JSON.parse(localCityName));
      updateUserLocation(localCityName);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("city", JSON.stringify(city));
  });

  const onKeyDown = (event) => {
    if (event.keyCode === 13) {
      onSearch(city, userLocation.lat, userLocation.lng);
    }
  };

  return (
    <div className="weather-search">
      <Tagline />
      <FormControl
        className="weather-search-form weather-search-input"
        placeholder="Enter city"
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
            onSearch(city, userLocation.lat, userLocation.lng);
          }}
        >
          <FaArrowRight />{" "}
        </Button>
      </div>
    </div>
  );
};

export default CitySelector;
