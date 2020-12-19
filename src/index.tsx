import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'dotenv/config';

import './styles/global.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
