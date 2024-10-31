import React, { useState } from 'react';
import './Otladka.css'; // Подключение стилей

const Otladka = () => {
  const [filters, setFilters] = useState({
    lectures: true, // Фильтр для отображения лекций
  });

  // Функция рендеринга мобильного расписания
  const renderMobileDaySchedule = (day) => {
    const classes = [
      { paranumber: "Первая пара", subject: "Компьютерное моделирование, лекция (VII)", dayIndex: 1 },
      { paranumber: "Вторая пара", subject: "Обработка экспериментальных данных, лекция (408 УК1)", dayIndex: 2 },
      { paranumber: "Третья пара", subject: "Перспективные технологии, лекция (VII)", dayIndex: 1 },
      { paranumber: "Четвертая пара", subject: "БЖД, лекция (I)", dayIndex: 1 },
    ];

    return classes.map((item, index) => (
      <div key={index} className="mobile-schedule-item">
        <div className="time-label">
          <span>{item.paranumber}</span>
        </div>
        {filters.lectures && day.getDay() === item.dayIndex && (
          <div className="green-block">
            {item.subject}
          </div>
        )}
      </div>
    ));
  };

  // Получаем текущую дату (для теста - можно заменить на нужный день)
  const currentDay = new Date();

  return (
    <div className="mobile-day-schedule">
      <h2>Расписание на {currentDay.toLocaleDateString('ru-RU', { weekday: 'long' })}</h2>
      {renderMobileDaySchedule(currentDay)}
      {!filters.lectures && <p>
