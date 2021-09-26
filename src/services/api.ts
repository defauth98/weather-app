import axios from 'axios';

const api = axios.create({
  baseURL: 'https://community-open-weather-map.p.rapidapi.com',
  headers: {
    'x-rapidapi-key': 'ce2d682f64msh6a101bcc3f3e384p1465e4jsnedad5bbbc311',
    'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
  },
});

export default api;
