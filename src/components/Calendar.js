import React, { useState } from 'react';
import './TE-21B.css';
import arrowLeft from './arrow_left.png';
import { ThemeContext } from './ThemeContext';
import arrowRight from './arrow_right.png';
import arrowLeftWeek from './arrow_left_week.png';
import arrowRightWeek from './arrow_right_week.png';
import { isWithinInterval } from 'date-fns';
import {
  format,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays
} from 'date-fns';
import { ru } from 'date-fns/locale';


const getMonthNameInGenitive = (date) => {
  const monthsInGenitive = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];
  const monthIndex = date.getMonth();
  return monthsInGenitive[monthIndex];
};

const getMonthNameInNominative = (date) => {
  const monthsInNominative = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];
  const monthIndex = date.getMonth();
  return monthsInNominative[monthIndex];
};

const monthsInGenitive = [
  'январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
];

const getFormattedMonth = (date) => {
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  return `${monthsInGenitive[monthIndex]} ${year}`;
};

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { locale: ru }));
  const [selectedDay, setSelectedDay] = useState(null);
  const monthYear = `${getMonthNameInNominative(currentMonth)} ${format(currentMonth, 'yyyy')}`;
  
  // Состояния для фильтров
  const [filters, setFilters] = useState({
    lectures: true,
    practicals: true,
    laba: true
  });

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const prevWeek = () => setCurrentWeek(subWeeks(currentWeek, 1));
  const nextWeek = () => setCurrentWeek(addWeeks(currentWeek, 1));

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setCurrentWeek(startOfWeek(day, { locale: ru, weekStartsOn: 1 }));
    setCurrentMonth(startOfMonth(day));
  };

  const handleFilterChange = (event) => {
    const { id, checked } = event.target;
    setFilters({
      ...filters,
      [id]: checked
    });
  };



 const monthName = getMonthNameInNominative(currentMonth); // Именительный падеж
  const weekStartDay = format(startOfWeek(currentWeek, { locale: ru, weekStartsOn: 1 }), 'd');
  const weekEndDay = format(endOfWeek(currentWeek, { locale: ru, weekStartsOn: 1 }), 'd');
  const monthsInNominative = getMonthNameInNominative(currentWeek);
  const year = format(currentWeek, 'yyyy'); // Текущий год
  const weekRange = `${monthsInNominative} ${weekStartDay} - ${weekEndDay}, ${year}` ; // Родиельный падеж

  const renderDaysOfWeek = () => {
    const daysOfWeek = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
    return daysOfWeek.map((day, index) => (
      <th key={index} className="week-table-cell">{day}</th>
    ));
  };

  const renderWeek = () => {
    const startDate = startOfWeek(currentWeek, { locale: ru, weekStartsOn: 1 });
    const days = [];
    let day = startDate;

    for (let i = 0; i < 7; i++) {
      days.push(day);
      day = addDays(day, 1);
    }

    const timeIntervals = [
  { paranumber: "Первая пара", start: "08:30", end: "10:00" },
  { paranumber: "Вторая пара", start: "10:15", end: "11:45" },
  { paranumber: "Третья пара", start: "12:00", end: "13:30" },
  { paranumber: "Четвертая пара", start: "14:15", end: "15:45" },
  { paranumber: "Пятая пара", start: "16:00", end: "17:30" },
  { paranumber: "Шестая пара", start: "16:00", end: "17:30" },
];

const timeRows = timeIntervals.map((interval, index) => (
  <React.Fragment key={index}>
    <tr>
      <td className="time-cell">
        <div className="pair-name">{interval.paranumber}</div>
      </td>
      {days.map((day, dayIndex) => {
        // Убедитесь, что currentTime правильно инициализирован
        const currentDateTime = new Date(); // или используйте ваше значение
        const intervalStart = new Date(
          day.getFullYear(), day.getMonth(), day.getDate(), 
          parseInt(interval.start.split(":")[0]), 
          parseInt(interval.start.split(":")[1])
        );
        const intervalEnd = new Date(
          day.getFullYear(), day.getMonth(), day.getDate(), 
          parseInt(interval.end.split(":")[0]), 
          parseInt(interval.end.split(":")[1])
        );

        // Проверяем, находится ли текущее время в пределах этого интервала
        const isCurrent = isWithinInterval(currentDateTime, { start: intervalStart, end: intervalEnd });

        return (
          <td key={dayIndex} className="date-cell">
			  {filters.lectures && day.getDay() === 1 && index === 0 && (
                <div className={`green-block ${isCurrent ? 'current-interval' : ''}`}>
                  <div className="text-top">Компьютерное моделирование, лекция (VII)</div>
                  <div className="text-bottom">8:30 - 10:00</div>
                </div>
              )}
			  {filters.lectures && day.getDay() === 1 && index === 1 && (
                <div className={`green-block ${isCurrent ? 'current-interval' : ''}`}>
                  <div className="text-top">Обработка эспериментальных данных, лекция (408 УК1)</div>
                  <div className="text-bottom">10:15 - 11:45</div>
                </div>
              )}
			  {filters.lectures && day.getDay() === 1 && index === 2 && (
                <div className={`green-block ${isCurrent ? 'current-interval' : ''}`}>
                  <div className="text-top">Перспективные технологии, лекция (VII)</div>
                  <div className="text-bottom">12:00 - 13:30</div>
                </div>
              )}
			  {filters.lectures && day.getDay() === 1 && index ===3 && (
                <div className={`green-block ${isCurrent ? 'current-interval' : ''}`}>
                  <div className="text-top">БЖД, лекция (I)</div>
                  <div className="text-bottom">14:15 - 15:45</div>
                </div>
              )}
              {filters.lectures && day.getDay() === 2 && index === 0 && (
                <div className={`green-block ${isCurrent ? 'current-interval' : ''}`}>
                  <div className="text-top">Компьютерное моделирование, лекция (VII)</div>
                  <div className="text-bottom">8:30 - 10:00</div>
                </div>
              )}
			  {filters.lectures && day.getDay() === 2 && index === 1 && (
                <div className={`green-block ${isCurrent ? 'current-interval' : ''}`}>
                  <div className="text-top">Перспективные технологии, лекция (VIII)</div>
                  <div className="text-bottom">10:15 - 11:45</div>
                </div>
              )}
			  {filters.lectures && day.getDay() === 2 && index === 2 && (
                <div className={`green-block ${isCurrent ? 'current-interval' : ''}`}>
                  <div className="text-top">БЖД, лекция (408)</div>
                  <div className="text-bottom">12:00 - 13:30</div>
                </div>
              )}
			  {filters.practicals && day.getDay() === 2 && index === 3 && (
                <div className={`practicals ${isCurrent ? 'current-interval' : ''}`}>
                  <div className="text-top">БЖД, Практика (213 УК1)</div>
                  <div className="text-bottom">14:15 - 15:45</div>
                </div>
              )}
              
			  {filters.lectures && day.getDay() === 3 && index === 1 && (
                <div className={`green-block ${isCurrent ? 'current-interval' : ''}`}>
                  <div className="text-top">Многоканальные телеком. системы, лекция (VIII)</div>
                  <div className="text-bottom">10:15 - 11:45</div>
                </div>
              )}
			  {filters.lectures && day.getDay() === 3 && index === 2 && (
                <div className={`green-block ${isCurrent ? 'current-interval' : ''}`}>
                  <div className="text-top">Физические основы радиосвязи, лекция (414 УК1)</div>
                  <div className="text-bottom">12:00 - 13:30</div>
                </div>
              )}
			  {filters.lectures && day.getDay() === 3 && index === 3 && (
                <div className={`green-block ${isCurrent ? 'current-interval' : ''}`}>
                  <div className="text-top">Сети связи и системы коммутации, лекция (VI)</div>
                  <div className="text-bottom">14:15 - 15:45</div>
                </div>
              )}
			  {filters.practicals && day.getDay() === 3 && index === 4 && (
                <div className={`practicals ${isCurrent ? 'current-interval' : ''}`}>
                  <div className="text-top">Физра</div>
                  <div className="text-bottom">16:00 - 17:30</div>
                </div>
              )}
              {filters.laba && day.getDay() === 4 && index === 0 && (
                <div className={`laba ${isCurrent ? 'current-interval' : ''}`}>
                  <div className="text-top">Физические основы радиосвязи, л.р (403 УК1)</div>
                  <div className="text-bottom">8:30 - 10:00</div>
                </div>
              )}
              
              {filters.lectures && day.getDay() === 4 && index === 1 && (
                <div className={`green-block ${isCurrent ? 'current-interval' : ''}`}>
                  <div className="text-top">Обработка эспериментальных данных, лекция (408 УК1)</div>
                  <div className="text-bottom">10:15 - 11:45</div>
                </div>
              )}
              
			  {filters.practicals && day.getDay() === 5 && index === 0 && (
                <div className={`practicals ${isCurrent ? 'current-interval' : ''}`}>
                  <div className="text-top">Физра</div>
                  <div className="text-bottom">8:30 - 10:00</div>
                </div>
              )}
			  {filters.lectures && day.getDay() === 5 && index === 1 && (
                <div className={`green-block ${isCurrent ? 'current-interval' : ''}`}>
                  <div className="text-top">Направляющие системы электросвязи, лекция (VIII)</div>
                  <div className="text-bottom">10:15 - 11:45</div>
                </div>
              )}
			   {filters.lectures && day.getDay() === 5 && index === 2 && (
                <div className={`green-block ${isCurrent ? 'current-interval' : ''}`}>
                  <div className="text-top">БЖД, лекция (I)</div>
                  <div className="text-bottom">12:00 - 13:30</div>
                </div>
              )}
			  {filters.lectures && day.getDay() === 5 && index === 3 && (
                <div className={`green-block ${isCurrent ? 'current-interval' : ''}`}>
                  <div className="text-top">Сети связи и системы коммутации, лекция (VIII)</div>
                  <div className="text-bottom">14:15 - 15:45</div>
                </div>
			
            )}
          </td>
        );
      })}
    </tr>
  </React.Fragment>
));

    return <>{timeRows}</>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { locale: ru, weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { locale: ru, weekStartsOn: 1 });

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, 'd');
        const cloneDay = day;
        days.push(
          <td key={day} className={`cell ${day < monthStart || day > monthEnd ? 'disabled' : ''} ${selectedDay && format(selectedDay, 'd') === formattedDate ? 'selected-day' : ''}`} onClick={() => handleDayClick(cloneDay)}>
            <span className="number">{formattedDate}</span>
          </td>
        );
        day = addDays(day, 1);
      }
      rows.push(<tr key={day}>{days}</tr>);
      days = [];
    }
    return rows;
  };

  return (
  <div className="calendar-container">
    <div className="sidebar-activity-container">
      <div className="sidebar">
        <div className="month-navigation">
          <h3>{monthYear}</h3>{/* Отображение месяца и года */}
          <button onClick={prevMonth}><img src={arrowLeft} alt="Previous Month" /></button>
          <button onClick={nextMonth}><img src={arrowRight} alt="Next Month" /></button>
        </div>
        <table className="month-calendar">
          <thead>
            <tr>
              {renderDaysOfWeek()}
            </tr>
          </thead>
          <tbody>{renderCells()}</tbody>
        </table>
      </div>

        <div className="activity-filter">
          <h2>Тип занятий</h2>
          <ul className="activity-list">
            <li>
              <input type="checkbox" id="lectures" checked={filters.lectures} onChange={handleFilterChange} />
              <label htmlFor="lectures">Лекции</label>
            </li>
            <li>
              <input type="checkbox" id="practicals" checked={filters.practicals} onChange={handleFilterChange} />
              <label htmlFor="practicals">Практика</label>
            </li>
            <li>
              <input type="checkbox" id="laba" checked={filters.laba} onChange={handleFilterChange} />
              <label htmlFor="laba">Лабораторные работы</label>
            </li>
          </ul>
        </div>
      </div>

      <div className="weekly-calendar">
        <div className="week-navigation">
          <button onClick={prevWeek}><img src={arrowLeftWeek} alt="Previous Week" /></button>
          <h2>{weekRange}</h2>
          <button onClick={nextWeek}><img src={arrowRightWeek} alt="Next Week" /></button>
        </div>
        <table className="week-table">
          <thead>
            <tr>
              <th></th>
              {renderDaysOfWeek()}
            </tr>
          </thead>
          <tbody>
            {renderWeek()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calendar;
