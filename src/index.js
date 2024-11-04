import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Analytics } from '@vercel/analytics/react';
import * as serviceWorkerRegistration from './serviceWorkerRegistration'; // Изменили импорт

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>
);

// Регистрируем Service Worker
serviceWorkerRegistration.register();
