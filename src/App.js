import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeContext, ThemeProvider } from './components/ThemeContext';
import TE21B from './components/TE21B';
import TE31B from './components/TE31B';
import Portfolio from './components/Portfolio';
import ProfileSelection from './components/ProfileSelection';
import CourseSelectionTE from './components/CourseSelectionTE';
import GroupSelectionTE3 from './components/GroupSelectionTE3';
import GroupSelectionTE2 from './components/GroupSelectionTE2';
import './App.css';
import logo from './logo.png';
import night from './night.png';
import soundFile from './sound.mp3';
import logoImage from './logo512.png';

const App = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFullyOpened, setIsFullyOpened] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [isMainContentVisible, setIsMainContentVisible] = useState(false);

  // Код для приветственного сообщения
  useEffect(() => {
    setIsMessageVisible(true);
    const timer = setTimeout(() => {
      setIsMessageVisible(false);
      setIsMainContentVisible(true); // Показываем основной контент после приветствия
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const toggleDrawer = () => {
    if (isDrawerOpen) {
      setIsFullyOpened(false);
      setTimeout(() => setIsDrawerOpen(false), 300);
    } else {
      setIsDrawerOpen(true);
      setTimeout(() => setIsFullyOpened(true), 300);
    }
  };

  const handleLogoClick = () => {
    const audio = new Audio(soundFile);

    setClickCount((prevCount) => {
      const newCount = prevCount + 1;

      if (newCount === 10) {
        audio.play();
        return 0;
      }

      return newCount;
    });
  };

  return (
    <Router>
      <div className={isDarkMode ? 'app dark-mode' : 'app'} style={{ minHeight: '100vh' }}>
        {/* Приветственное сообщение с изображением */}
        {isMessageVisible && (
          <div className="welcome-message">
            <div className="hero"></div>
            <div className="content">
              <h1 className="h1--scalingSize" data-text="An awesome title">Добро пожаловать</h1>
            </div>
          </div>
        )}

        {/* Основной контент */}
        <div className={`main-content ${isMainContentVisible ? 'visible' : ''}`}>
          {/* Верхняя панель с логотипом и кнопками */}
          <div className="header">
            <button className="logo-button" onClick={handleLogoClick}>
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
            <Route path="/group-selectionte2" element={<GroupSelectionTE2 />} />
            <Route path="/TE31B" element={<TE31B />} />
            <Route path="/group-selectionte3" element={<GroupSelectionTE3 />} />
            <Route path="/TE21B" element={<TE21B />} />
            <Route path="/portfolio" element={<Portfolio />} />
          </Routes>
        </div>
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
