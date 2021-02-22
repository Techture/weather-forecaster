import React from "react";
import Header from "../views/layout/Header";
import { API_KEY, API_BASE_URL } from "../apis/config";
import UseFetch from "../hooks/UseFetch";
import CitySelector from "../components/CitySelector";
import DailyWeatherList from "./DailyWeatherList";
import HourlyWeatherList from "./HourlyWeatherList";
import CurrentWeatherView from "./CurrentWeatherView";
import Footer from "../views/layout/Footer";

// list of cities to pull lat/lng from
// import cities from "cities.json";

const Main = () => {
  const { data, error, isLoading, setUrl } = UseFetch();
  // console.log("MAIN DATA >>", data);

  const getCurrentWeather = () => {
    if (error) return <h2>Sorry, {error}.</h2>;
    if (!data && isLoading) return <h2>Loading...</h2>;
    if (!data) return null;
    return (
      <>
        <CurrentWeatherView
          currentWeather={data.current}
          city={data.timezone}
        />
        <DailyWeatherList dailyWeather={data.daily} city={data.timezone} />
        <HourlyWeatherList hourlyWeather={data.hourly} city={data.timezone} />
      </>
    );
  };

  // TODO convert city into lat/lng properties to use in the setUrl function

  return (
    <>
      <div className="main">
        <Header />
        <CitySelector
          onSearch={(city) =>
            setUrl(
              `${API_BASE_URL}/data/2.5/onecall?lat=${40.6501}&lon=${-73.94958}&appid=${API_KEY}&units=imperial`
            )
          }
        />
        {/* grab current weather */}
        {getCurrentWeather()}
      </div>
      <Footer />
    </>
  );
};

export default Main;
