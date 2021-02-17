# Weather Forecaster

## OpenWeather Code Challenge

### What I'm using

- hooks - to manage state
- context - to pass state through components
- OpenWeather api - to get weather data
- geolocation api - to get user location
- localStorage - to persist data on browser refresh

### Installation

- clone repo
- get an OpenWeather api key - https://openweathermap.org/api
- run npm or yarn install
- create a secrets.js file in the root of your project folder
- add the below snippet to the secrets.js file

```html
const apiKey = "your_API_KEY_goes_here"; module.exports = { apiKey, };
```

- don't forget to add the secrets.js file to your .gitignore file

- run npm or yarn start
