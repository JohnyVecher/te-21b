import React, { createContext, useState, useEffect } from 'react';

// Создаем контекст темы
export const ThemeContext = createContext();

// Провайдер темы
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Функция для переключения темы
  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  // Сохранение темы в локальное хранилище, чтобы при перезагрузке сохранять состояние
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
