import React, { useState } from 'react';
import Calendar from './components/Calendar';
import './App.css';
import logo from './logo.png';

const App = () => {
  const [events] = useState([
    {
      title: 'Занятие по математике',
      start: new Date(2024, 8, 7, 9, 0), // Сентябрь 7, 2024, 9:00
      end: new Date(2024, 8, 7, 11, 0),
    },
    {
      title: 'Лекция по программированию',
      start: new Date(2024, 8, 8, 12, 30),
      end: new Date(2024, 8, 8, 14, 0),
    },
  ]);

  return (
    <div style={{ backgroundColor: '#D9E1F0', minHeight: '130vh', maxHeight: '1500vh' }}>
      <div className="App">
        <div className="header">
          <button className="logo-button">
            <img src={logo} alt="Logo" className="logo-image" />
          </button>
          <div className="te21b">ТЕ-21Б</div>
          <h1>Расписание</h1>
        </div>
        <Calendar events={events} />
      </div>
    </div>
  );
};

export default App;
