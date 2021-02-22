import React, { useEffect, useState } from "react";
import Tagline from "./Tagline";
import { FaArrowRight } from "react-icons/fa";
import { FormControl, Button } from "react-bootstrap";

const CitySelector = ({ onSearch }) => {
  const [city, setCity] = useState("");

  // as the user types a city, the city is matched with its lat/lng
  // helper to match the city names
  //     const cleanCityName = (cityName) => {
  //       return cityName.toLowerCase();
  //     };

  //     const updateUserLocation = () => {
  //       for (const cityIndex of cities) {
  //         if (cleanCityName(cityIndex.name) === cleanCityName(city)) {
  //           setCityLocation({
  //             latitude: cityIndex.lat,
  //             longitude: cityIndex.lng,
  //             name: cityIndex.name,
  //           });
  //           setCity(cityIndex.name);
  //         }
  //       }
  //     };

  //     updateUserLocation();

  const [userLocation, setUserLocation] = useState({
    lat: 64.128288,
    lng: -21.827774,
    name: "Reykjavík",
  });

  // console.log("userlocation >> ", userLocation);

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
      onSearch(city);
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
