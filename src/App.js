import React, { useState } from 'react';
import Calendar from './components/Calendar';
import ProfessorsList from './components/ProfessorsList';
import Portfolio from './components/Portfolio';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import logo from './logo.png';

const App = () => {
  const [events] = useState([
    // Пример данных для событий
  ]);

  return (
    <Router>
      <div style={{ backgroundColor: '#D9E1F0', minHeight: '130vh', maxHeight: '1500vh' }}>
        <div className="App">
          <div className="header">
            <button className="logo-button">
              <img src={logo} alt="Logo" className="logo-image" />
            </button>
            <div className="te21b">ТЕ-21Б</div>
            <div className="header-buttons">
              <Link to="/" className="header-button">
                <h1>Расписание</h1>
              </Link>
              <Link to="/professors" className="header-button">
 
				</Link>
			  <Link to="/Portfolio" className="header-button">
                <h1>Портфолио</h1>
              </Link>
            </div>
          </div>
          <Routes>
            <Route path="/" element={<Calendar events={events} />} />
            <Route path="/professors" element={<ProfessorsList />} />
			<Route path="/portfolio" element={<Portfolio />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;