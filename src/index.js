import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Опционально, если у тебя есть стили для всей страницы
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
