import React from "react";
import Header from "../views/layout/Header";
import { API_KEY, API_BASE_URL } from "../apis/config";
import CitySelector from "../components/CitySelector";
import useFetch from "../hooks/UseFetch";
import Weather from "../components/Weather";
import Footer from "../views/layout/Footer";

const Main = () => {
  const { setUrl } = useFetch();

  return (
    <>
      <div className="main">
        <Header />
        <CitySelector
          // pass up the current lat/lng of the city that the user types in from CitySelector
          onSearch={(latitude, longitude) =>
            setUrl(
              `${API_BASE_URL}/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=imperial`
            )
          }
        />
        {/* funnel weather data from the onecall endpoint */}
        <Weather />
      </div>
      <Footer />
    </>
  );
};

export default Main;
