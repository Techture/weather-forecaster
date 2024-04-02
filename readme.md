## Weather Forecaster
[View the app](https://weather-forecaster-v1.netlify.app/)

Weather Forecaster is an application that provides current, hourly, and daily weather data to users. It's built with a focus on user experience and data persistence.

### What I'm Using
1. Hooks: Utilized to manage state within the application, ensuring a responsive and interactive user experience.
2. localStorage: Employs the browser's localStorage to persist weather data, maintaining user data across browser refreshes.
3. OpenWeather API: Integrates the OpenWeather One Call API to fetch comprehensive weather data.

### Installation
To set up the Weather Forecaster app locally, follow these steps:

1. Obtain an API Key - Sign up at OpenWeatherMap to get your API key.
2. Clone the repo to your local machine using

```
git clone <repository-url>
```

Configure API Key:
Navigate to src/apis/config.js and insert your API key:
javascript
Copy code
const API_KEY = 'your_api_key_here';
export default API_KEY;
Install Dependencies:

Install the necessary packages using npm or yarn:
```
npm install
# or
yarn install
```

Start the Application:

```
npm start
# or
yarn start
```
Visit http://localhost:3000 in your browser to view the app.




