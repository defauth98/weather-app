import React, { useState } from 'react';

import api from './services/api';

import { FiSearch } from 'react-icons/fi';
import { TiWeatherStormy } from 'react-icons/ti';
import { ImArrowUp, ImArrowDown } from 'react-icons/im';

import './styles/pages/main-page.css';

interface weekDay {
  main: {
    temp_max: string;
    temp_min: string;
  };
  weather: [{ main: string }];
}

function App() {
  const [city, setCity] = useState('');
  const [fellsLike, setFellsLike] = useState('');
  const [temperature, setTemperature] = useState('');
  const [cityResponse, setCityResponse] = useState('');
  const [minTemperature, setMinTemperature] = useState('');
  const [maxTemperature, setMaxTemperature] = useState('');
  const [humidity, setHumidity] = useState('');
  const [pressure, setPressure] = useState('');
  const [weather, setWeather] = useState('');
  const [icon, setIcon] = useState('');

  const [monday, setMonday] = useState<weekDay>();
  const [tuesday, setTuesday] = useState<weekDay>();
  const [wednesday, setWednesday] = useState<weekDay>();
  const [thursday, setThursday] = useState<weekDay>();
  const [friday, setFriday] = useState<weekDay>();

  async function handleSearchForWeather() {
    const response = await api.get('find', {
      params: { q: city, units: 'metric' },
    });

    const data = response.data.list[0];

    console.log(response.data.list[0].weather[0]);

    setMonday(response.data.list[0]);
    setTuesday(response.data.list[1]);
    setWednesday(response.data.list[2]);
    setThursday(response.data.list[3]);
    setFriday(response.data.list[4]);

    setCityResponse(data.name);
    setFellsLike(Number(data.main.feels_like).toFixed(0));
    setTemperature(Number(data.main.temp).toFixed(0));

    setMaxTemperature(Number(data.main.temp_max).toFixed(0));
    setMinTemperature(Number(data.main.temp_min).toFixed(0));

    setHumidity(Number(data.main.humidity).toFixed(0));
    setPressure(Number(data.main.pressure).toFixed(0));

    setWeather(data.weather[0].description);
    setIcon(data.weather[0].icon);
  }

  return (
    <div className="main-page">
      <div className="search-box">
        <input
          type="text"
          onChange={(e) => setCity(e.target.value)}
          placeholder="search by city"
        />
        <button onClick={handleSearchForWeather}>
          <FiSearch color="black" size="40" />
        </button>
      </div>

      <div className="current-weather">
        <div className="current-day">
          <h2>Current weather</h2>
          <h3>{cityResponse}</h3>

          <div className="weather">
            <img
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              alt="weather-condition"
            />
            <span>{temperature}º</span>
          </div>

          <span>{weather}</span>
        </div>

        <div className="current-info">
          <span>Fells like {fellsLike}º</span>
          <div className="temperature">
            <div className="max">
              <ImArrowUp />
              {maxTemperature}º
            </div>
            <div className="min">
              <ImArrowDown />
              {minTemperature}º
            </div>
          </div>
          <div className="infos">
            <span>
              Humidity <strong>{humidity}%</strong>
            </span>
            <span>
              Presure <strong>{pressure}hPa</strong>
            </span>
          </div>
        </div>
      </div>
      <div className="week-info">
        <h2>Extended Forecast</h2>

        <div className="week-days">
          <div className="day">
            <span>Mon</span>
            <TiWeatherStormy color="white" size="20" />
            <span>{`${monday?.weather[0].main}`}</span>
            <span>{`${monday?.main.temp_max}º/${monday?.main.temp_min}º`}</span>
          </div>
          <div className="day">
            <span>Tue</span>
            <TiWeatherStormy color="white" size="20" />
            <span>{`${tuesday?.weather[0].main}`}</span>
            <span>{`${tuesday?.main.temp_max}º/${tuesday?.main.temp_min}º`}</span>
          </div>
          <div className="day">
            <span>Wed</span>
            <TiWeatherStormy color="white" size="20" />
            <span>{`${wednesday?.weather[0].main}`}</span>
            <span>{`${wednesday?.main.temp_max}º/${wednesday?.main.temp_min}º`}</span>
          </div>
          <div className="day">
            <span>Thur</span>
            <TiWeatherStormy color="white" size="20" />
            <span>{`${thursday?.weather[0].main}`}</span>
            <span>{`${thursday?.main.temp_max}º/${thursday?.main.temp_min}º`}</span>
          </div>
          <div className="day">
            <span>Fri</span>
            <TiWeatherStormy color="white" size="20" />
            <span>{`${friday?.weather[0].main}`}</span>
            <span>{`${friday?.main.temp_max}º/${friday?.main.temp_min}º`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
