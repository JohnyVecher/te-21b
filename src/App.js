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

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Router>
      <div className={isDarkMode ? 'app dark-mode' : 'app'} style={{ minHeight: '100vh' }}>
        {/* Верхняя панель с логотипом и кнопками */}
        <div className="header">
          <button className="logo-button">
            <img src={logo} alt="Logo" className="logo-image" />
          </button>
          <div className="te21b"></div>
          <div className="header-buttons1">
            <Link to="/" className="header-button">
              <h1>Расписание</h1>
            </Link>
            <Link to="/portfolio" className="header-button">
              <h1>Портфолио</h1>
            </Link>
			<Link to="/portfolio" className="header-button">
              <h1>Сессия</h1>
            </Link>
			<Link to="/portfolio" className="header-button">
              <h1>Инфо</h1>
            </Link>
          </div>
        <button
          onClick={toggleTheme}
          className="theme-toggle"
          style={{
            backgroundColor: isDarkMode ? '#cccccc' : '#fff', // Цвет фона кнопки
            color: isDarkMode ? '#fff' : '#fff' // Цвет текста кнопки
          }}
        >
          <img src={night} alt="night" className="logo-image" />
        </button>
          <button className="menu-button" onClick={toggleDrawer}>
            ☰
          </button>
        </div>

        {/* Выдвижная шторка для кнопок навигации */}
        <div className={`drawer ${isDrawerOpen ? 'open' : ''}`}>
          <div className="header-buttons">
            <Link to="/" className="header-button" onClick={toggleDrawer}>
              <h1>Расписание</h1>
            </Link>
            <Link to="/portfolio" className="header-button" onClick={toggleDrawer}>
              <h1>Портфолио</h1>
            </Link>
            <Link to="/session" className="header-button" onClick={toggleDrawer}>
              <h1>Сессия</h1>
            </Link>
            <Link to="/info" className="header-button" onClick={toggleDrawer}>
              <h1>Инфо</h1>
            </Link>
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
