import React from 'react';
import FormatTime from '../utils/FormatTime';
import Accordion from '../components/Accordion';

const DailyWeatherView = ({ dailyWeather, timezone, city }) => {
  const roundTemp = (tempToRound) => {
    return Math.round(tempToRound);
  };

  const formatTime = (timeToFormat) => {
    return FormatTime(timeToFormat, timezone, 'hA');
  };

  const formatDate = (dateToFormat) => {
    return FormatTime(dateToFormat, timezone, 'MM/DD');
  };

  return (
    <div className='daily-weather-data'>
      <p className='daily-weather-tagline'>
        8 Day Forecast |<span className='daily-weather-data-city'> {city}</span>
      </p>

      <Accordion title={'Click To View'} isExpand={false}>
        <div className='daily-weather-data-box'>
          {dailyWeather &&
            dailyWeather.length > 0 &&
            dailyWeather.map((day, idx) => {
              return (
                <span className='daily-weather-data-property' key={idx}>
                  <p className='weather-data-title'>
                    Date | Time | Temp | High | Low | Conditions
                  </p>
                  <p className='weather-data-value'>
                    {formatDate(day.dt)} | {formatTime(day.dt)} |{' '}
                    {roundTemp(day.temp.day)}&#176; | {roundTemp(day.temp.max)}
                    &#176; | {roundTemp(day.temp.min)}
                    &#176; | {day.weather[0].main}
                    <img
                      className='daily-weather-data-icon'
                      src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                      alt=''
                    />
                  </p>
                </span>
              );
            })}
        </div>
      </Accordion>
    </div>
  );
};

export default DailyWeatherView;
