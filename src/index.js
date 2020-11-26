import './index.css';
import React from 'react';
import { render } from 'react-dom';

import App from './components/App';

const root = document.getElementById('root');

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root
);
