import axios from 'axios';

const API_KEY = 'bf3143523aac3ff24d2ff18bdcba3a9f';
const ROOT_URL =  `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;
const DEFAULT_COUNTRY_CODE = 'br';

export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather(city) {
  const url = `${ROOT_URL}&q=${city},${DEFAULT_COUNTRY_CODE}`;
  const request = axios.get(url);

  return {
    type: FETCH_WEATHER,
    payload: request
  };
}
