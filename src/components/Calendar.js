import React, { useState } from 'react';
import './Calendar.css';
import arrowLeft from './arrow_left.png';
import arrowRight from './arrow_right.png';
import arrowLeftWeek from './arrow_left_week.png';
import arrowRightWeek from './arrow_right_week.png';
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

    const hours = Array.from({ length: 11 }, (_, i) => i + 8);

    const timeRows = hours.map(hour => (
      <React.Fragment key={hour}>
        <tr>
          <td className="time-cell">{`${hour}:00`}</td>
          {days.map((day, dayIndex) => (
            <td key={dayIndex} className="date-cell">
              {filters.lectures && day.getDay() === 1 && hour === 8 && (
                <div className="green-block">
                  <div className="text-top">Компьютерное моделирование, лекция (VII)</div>
                  <div className="text-bottom">8:30 - 10:00</div>
                </div>
              )}
			  {filters.lectures && day.getDay() === 1 && hour === 10 && (
                <div className="green-block1">
                  <div className="text-top">Обработка эспериментальных данных, лекция (408 УК1)</div>
                  <div className="text-bottom">10:15 - 11:45</div>
                </div>
              )}
			  {filters.lectures && day.getDay() === 1 && hour === 12 && (
                <div className="green-block2">
                  <div className="text-top">Перспективные технологии, лекция (VII)</div>
                  <div className="text-bottom">12:00 - 13:30</div>
                </div>
              )}
			  {filters.lectures && day.getDay() === 1 && hour === 14 && (
                <div className="green-block3">
                  <div className="text-top">БЖД, лекция (I)</div>
                  <div className="text-bottom">14:15 - 15:45</div>
                </div>
              )}
              {filters.lectures && day.getDay() === 2 && hour === 8 && (
                <div className="green-block">
                  <div className="text-top">Компьютерное моделирование, лекция (VII)</div>
                  <div className="text-bottom">8:30 - 10:00</div>
                </div>
              )}
			  {filters.lectures && day.getDay() === 2 && hour === 10 && (
                <div className="green-block1">
                  <div className="text-top">Перспективные технологии, лекция (VIII)</div>
                  <div className="text-bottom">10:15 - 11:45</div>
                </div>
              )}
			  {filters.lectures && day.getDay() === 2 && hour === 12 && (
                <div className="green-block2">
                  <div className="text-top">БЖД, лекция (408)</div>
                  <div className="text-bottom">12:00 - 13:30</div>
                </div>
              )}
			  {filters.practicals && day.getDay() === 2 && hour === 14 && (
                <div className="practicals4">
                  <div className="text-top">БЖД, Практика (213 УК1)</div>
                  <div className="text-bottom">12:00 - 13:30</div>
                </div>
              )}
			  {filters.lectures && day.getDay() === 3 && hour === 10 && (
                <div className="green-block1">
                  <div className="text-top">Многоканальные телеком. системы, лекция (VIII)</div>
                  <div className="text-bottom">10:15 - 11:45</div>
                </div>
              )}
			  {filters.lectures && day.getDay() === 3 && hour === 12 && (
                <div className="green-block2">
                  <div className="text-top">Физические основы радиосвязи, лекция (414 УК1)</div>
                  <div className="text-bottom">12:00 - 13:30</div>
                </div>
              )}
			  {filters.lectures && day.getDay() === 3 && hour === 14 && (
                <div className="green-block3">
                  <div className="text-top">Сети связи и системы коммутации, лекция (VI)</div>
                  <div className="text-bottom">14:15 - 15:45</div>
                </div>
              )}
			  {filters.practicals && day.getDay() === 3 && hour === 15 && (
                <div className="practicals5">
                  <div className="text-top">Физра</div>
                  <div className="text-bottom">16:00 - 17:30</div>
                </div>
              )}
              {filters.laba && day.getDay() === 4 && hour === 8 && (
                <div className="laba">
                  <div className="text-top">Физические основы радиосвязи, л.р (403 УК1)</div>
                  <div className="text-bottom">8:30 - 10:00</div>
                </div>
              )}
              
              {filters.lectures && day.getDay() === 4 && hour === 10 && (
                <div className="green-block1">
                  <div className="text-top">Обработка эспериментальных данных, лекция (408 УК1)</div>
                  <div className="text-bottom">10:15 - 11:45</div>
                </div>
              )}
              
			  {filters.practicals && day.getDay() === 5 && hour === 8 && (
                <div className="practicals">
                  <div className="text-top">Физра</div>
                  <div className="text-bottom">8:30 - 10:00</div>
                </div>
              )}
			  {filters.lectures && day.getDay() === 5 && hour === 10 && (
                <div className="green-block1">
                  <div className="text-top">Направляющие системы электросвязи, лекция (VIII)</div>
                  <div className="text-bottom">10:15 - 11:45</div>
                </div>
              )}
			   {filters.lectures && day.getDay() === 5 && hour === 12 && (
                <div className="green-block2">
                  <div className="text-top">Обработка экспериментальных данных, лекция (414)</div>
                  <div className="text-bottom">12:00 - 13:30</div>
                </div>
              )}
			  {filters.lectures && day.getDay() === 5 && hour === 14 && (
                <div className="green-block3">
                  <div className="text-top">Сети связи и системы коммутации, лекция (VIII)</div>
                  <div className="text-bottom">14:15 - 15:45</div>
                </div>
              )}
			 
            </td>
          ))}
        </tr>
        <tr className="hidden-row">
          <td className="time-cell">{`${hour}:30`}</td>
          {days.map((day, dayIndex) => (
            <td key={dayIndex} className="date-cell"></td>
          ))}
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
