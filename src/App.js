import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeContext, ThemeProvider } from './components/ThemeContext';
import TE21B from './components/TE21B';
import TE31B from './components/TE31B';
import Info from './components/info';
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
  const [isMessageVisible, setIsMessageVisible] = useState(true);
  const [isMainContentVisible, setIsMainContentVisible] = useState(false);

  useEffect(() => {
    // Скрываем приветствие через 2 секунды
    const hideMessageTimer = setTimeout(() => {
      setIsMessageVisible(false);
    }, 20000);

    // Появление основного контента через 1 секунду после загрузки
    const showMainContentTimer = setTimeout(() => {
      setIsMainContentVisible(true);
    }, 1000);

    return () => {
      clearTimeout(hideMessageTimer);
      clearTimeout(showMainContentTimer);
    };
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
        {isMessageVisible && (
          <div className="welcome-message">
            <div className="hero"></div>
            <div className="content">
              <h1 className="h1--scalingSize">Добро пожаловать</h1>
            </div>
          </div>
        )}

        <div className={`main-content ${isMainContentVisible ? 'visible' : ''}`}>
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
            {}
            <div className={`menu-button ${isDrawerOpen ? 'open' : ''}`} onClick={toggleDrawer}>
              <span className={`line line1 ${isFullyOpened ? 'opened' : ''}`}></span>
              <span className={`line line2 ${isFullyOpened ? 'opened' : ''}`}></span>
            </div>
          </div>

         
          <div className={`drawer ${isDrawerOpen ? 'open' : ''}`}>
            <div className="header-buttons">
              <Link to="/" className="header-button" onClick={toggleDrawer}>Расписание</Link>
              <Link to="/portfolio" className="header-button" onClick={toggleDrawer}>Портфолио</Link>
              <Link to="/info" className="header-button" onClick={toggleDrawer}>Инфо</Link>

            </div>
          </div>

         
          <Routes>
            <Route path="/" element={<ProfileSelection />} />
            <Route path="/course-selectionte" element={<CourseSelectionTE />} />
            <Route path="/group-selectionte2" element={<GroupSelectionTE2 />} />
            <Route path="/TE31B" element={<TE31B />} />
            <Route path="/group-selectionte3" element={<GroupSelectionTE3 />} />
            <Route path="/TE21B" element={<TE21B />} />
            <Route path="/portfolio" element={<Portfolio />} />
			<Route path="/info" element={<Info />} />
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
