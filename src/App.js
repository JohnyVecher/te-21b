import React, { useContext } from 'react';
import { ThemeContext, ThemeProvider } from './components/ThemeContext'; 
import TE21B from './components/TE21B';
import Portfolio from './components/Portfolio';
import ProfileSelection from './components/ProfileSelection';
import CourseSelectionTE from './components/CourseSelectionTE';
import CourseSelectionITE from './components/CourseSelectionITE';
import GroupSelectionTE from './components/GroupSelectionTE';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import logo from './logo.png';
import night from './night.png';

const App = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <Router>
      <div className={isDarkMode ? 'app dark-mode' : 'app'} style={{ minHeight: '100vh' }}>
        <div className="header">
          <button className="logo-button">
            <img src={logo} alt="Logo" className="logo-image" />
          </button>
          <div className="te21b"></div>
          <div className="header-buttons">
            <Link to="/" className="header-button">
              <h1>Расписание</h1>
            </Link>
            <Link to="/portfolio" className="header-button">
              <h1>Портфолио</h1>
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
        </div>
        <Routes>
        <Route path="/" element={<ProfileSelection />} />
		<Route path="/course-selectionte" element={<CourseSelectionTE />} />
		<Route path="/group-selectionte3" element={<GroupSelectionTE/>} />
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
