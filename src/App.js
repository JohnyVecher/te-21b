import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeContext, ThemeProvider } from './components/ThemeContext'; 
import TE21B from './components/TE21B';
import Portfolio from './components/Portfolio';
import ProfileSelection from './components/ProfileSelection';
import CourseSelectionTE from './components/CourseSelectionTE';
import GroupSelectionTE from './components/GroupSelectionTE';
import './App.css';
import logo from './logo.png';
import night from './night.png';

const App = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFullyOpened, setIsFullyOpened] = useState(false);

 const toggleDrawer = () => {
    if (isDrawerOpen) {
      setIsFullyOpened(false); // Вернем полоски к исходному состоянию
      setTimeout(() => setIsDrawerOpen(false), 300); // Закроем шторку после анимации
    } else {
      setIsDrawerOpen(true); // Открытие шторки
      setTimeout(() => setIsFullyOpened(true), 300); // Добавим крестик после анимации
    }
  };

  return (
    <Router>
      <div className={isDarkMode ? 'app dark-mode' : 'app'} style={{ minHeight: '100vh' }}>
        {/* Верхняя панель с логотипом и кнопками */}
        <div className="header">
          <button className="logo-button">
            <img src={logo} alt="Logo" className="logo-image" />
          </button>
          <div className="header-buttons1">
            <Link to="/" className="header-button">Расписание</Link>
            <Link to="/portfolio" className="header-button">Портфолио</Link>
            <Link to="/session" className="header-button">Сессия</Link>
            <Link to="/info" className="header-button">Инфо</Link>
          </div>
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            style={{
              backgroundColor: isDarkMode ? '#cccccc' : '#fff',
              color: isDarkMode ? '#fff' : '#fff'
            }}
          >
            <img src={night} alt="night" className="logo-image" />
          </button>
          {/* Кнопка для шторки с анимацией */}
          <div className={`menu-button ${isDrawerOpen ? 'open' : ''}`} onClick={toggleDrawer}>
            <span className={`line line1 ${isFullyOpened ? 'opened' : ''}`}></span>
            <span className={`line line2 ${isFullyOpened ? 'opened' : ''}`}></span>
          </div>
        </div>

        {/* Выдвижная шторка */}
        <div className={`drawer ${isDrawerOpen ? 'open' : ''}`}>
          <div className="header-buttons">
            <Link to="/" className="header-button" onClick={toggleDrawer}>Расписание</Link>
            <Link to="/portfolio" className="header-button" onClick={toggleDrawer}>Портфолио</Link>
            <Link to="/session" className="header-button" onClick={toggleDrawer}>Сессия</Link>
          </div>
        </div>

        {/* Основные маршруты */}
        <Routes>
          <Route path="/" element={<ProfileSelection />} />
          <Route path="/course-selectionte" element={<CourseSelectionTE />} />
          <Route path="/group-selectionte3" element={<GroupSelectionTE />} />
          <Route path="/TE21B" element={<TE21B />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </div>
    </Router>
  );
};

export default function WrappedApp() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
