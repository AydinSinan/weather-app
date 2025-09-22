require("dotenv").config({ path: "./.env" }); 
const axios = require('axios');

const weatherApiKey = process.env.WEATHERAPI_KEY;
const weatherStackKey = process.env.WEATHERSTACK_KEY;

//console.log(weatherApiKey, weatherStackKey)

async function fetchWeatherAPI(location) {
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${encodeURIComponent(location)}&days=1&aqi=no&alerts=no`;
  const { data } = await axios.get(url);
  return data.current.temp_c;
}

async function fetchWeatherStack(location) {
  const url = `http://api.weatherstack.com/current?access_key=${weatherStackKey}&query=${encodeURIComponent(location)}`;
  const { data } = await axios.get(url);
  if (data.error) throw new Error(data.error.info);
  return data.current.temperature;
}

module.exports = { fetchWeatherAPI, fetchWeatherStack };
