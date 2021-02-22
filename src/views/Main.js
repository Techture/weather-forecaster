import React, { useState } from "react";
import Header from "../views/layout/Header";
import { API_KEY, API_BASE_URL } from "../apis/config";
import UseFetch from "../hooks/UseFetch";
import CitySelector from "../components/CitySelector";
import DailyWeatherList from "./DailyWeatherList";
import Footer from "../views/layout/Footer";

// list of cities to pull lat/lng from
// import cities from "cities.json";

const Main = () => {
  const { data, error, isLoading, setUrl } = UseFetch();
  console.log("MAIN DATA >>", data);

  const getDailyWeather = () => {
    if (error) return <h2>Error when fetching: {error}</h2>;
    if (!data && isLoading) return <h2>LOADING...</h2>;
    if (!data) return null;
    return <DailyWeatherList dailyWeather={data.list} city={data.city.name} />;
  };

  return (
    <>
      <div className="main">
        <Header />
        <CitySelector
          onSearch={(city) =>
            setUrl(
              `${API_BASE_URL}/data/2.5/forecast?q=${city}&cnt=5&appid=${API_KEY}&units=imperial`
            )
          }
        />
        {/* {error !== null && <p>{<Error error={error} />}</p>} */}
        {/* {currentWeather !== null && (
          <CurrentWeatherData
            currentWeather={currentWeather}
            conditions={conditions}
            // city={city}
          />
        )} */}

        {/* grab daily weather */}
        {getDailyWeather()}

        {/* {hourlyWeather !== null && (
          <HourlyWeatherData
            hourlyWeather={hourlyWeather}
            timezone={timezone}
            // city={city}
          />
        )}  */}
      </div>
      <Footer />
    </>
  );
};

export default Main;
