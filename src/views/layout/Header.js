import React from 'react';
import weatherIcon from '../../img/weather-title-icon.jpg';

const Header = () => (
  <div className='header'>
    <h1 className='header-title'>
      Weather Forecaster!{' '}
      <img className='weather-title-icon' src={weatherIcon} alt='' />
    </h1>
  </div>
);

export default Header;
