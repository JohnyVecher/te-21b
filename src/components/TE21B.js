import React, { useState } from 'react';
import './TE21B.css';
import arrowLeft from './arrow_left.png';
import { ThemeContext } from './ThemeContext';
import locations from './locationsr.png';
import time from './time.png';
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
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'Октябрь', 'Ноябрь', 'декабря'
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

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { locale: ru }));
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMobileDay, setSelectedMobileDay] = useState(new Date());
  const currentDay = new Date().getDay();
  const daysOfWeek = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
  const getCurrentDate = () => {
    const date = new Date();
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return date.toLocaleDateString('ru-RU', options); // Форматируем дату для отображения на русском
  };

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

  const monthYear = `${getMonthNameInNominative(currentMonth)} ${format(currentMonth, 'yyyy')}`;
  const weekStartDay = format(startOfWeek(currentWeek, { locale: ru, weekStartsOn: 1 }), 'd');
  const weekEndDay = format(endOfWeek(currentWeek, { locale: ru, weekStartsOn: 1 }), 'd');
  const weekRange = `${getMonthNameInGenitive(currentWeek)} ${weekStartDay} - ${weekEndDay}, ${format(currentWeek, 'yyyy')}`;

  const renderDaysOfWeek = () => {
    const daysOfWeek = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
    return daysOfWeek.map((day, index) => (
      <th key={index} className="week-table-cell">{day}</th>
    ));
  };

  const renderMobileDaySchedule = (day) => {
    const timeIntervals = [
        { paranumber: "Первая пара", start: "08:30", end: "10:00" },
        { paranumber: "Вторая пара", start: "10:15", end: "11:45" },
        { paranumber: "Третья пара", start: "12:00", end: "13:30" },
        { paranumber: "Четвертая пара", start: "14:15", end: "15:45" },
        { paranumber: "Пятая пара", start: "16:00", end: "17:30" },
        { paranumber: "Шестая пара", start: "18:00", end: "19:30" },
    ];

    return timeIntervals.map((interval, index) => {
        const isCurrent = isWithinInterval(new Date(), {
            start: new Date(day.getFullYear(), day.getMonth(), day.getDate(), parseInt(interval.start.split(":")[0]), parseInt(interval.start.split(":")[1])),
            end: new Date(day.getFullYear(), day.getMonth(), day.getDate(), parseInt(interval.end.split(":")[0]), parseInt(interval.end.split(":")[1])),
        });

        // Переменная для хранения содержимого ячейки
        let cellContent = null;

        // Проверяем условия для каждой пары
        if (filters.practicals && day.getDay() === 5 && index === 0) {
            cellContent = (
                <div className={`practicals ${isCurrent ? 'current-interval' : ''}`}>
                    <div className="text-task">Физра</div>
                    <div className="text-place">
					<img src={locations} alt="locations" className="locations" style={{ fill: '#ece9f2' }} />
                    Спорт зал
                    </div>
                    <div className="text-time">
					<img src={time} alt="time" className="time" style={{ fill: '#ece9f2' }}/>
					8:30 - 10:00
					</div>
                </div>
            );
        } else if (filters.lectures && day.getDay() === 5 && index === 1) {
            cellContent = (
                <div className={`green-block ${isCurrent ? 'current-interval' : ''}`}>
                    <div className="text-task">Направляющие системы электросвязи</div>
                    <div className="text-place">
					<img src={locations} alt="locations" className="locations" style={{ fill: '#ece9f2' }} />VIII римская</div>
                    <div className="text-time">
					<img src={time} alt="time" className="time" style={{ fill: '#ece9f2' }}/>10:15 - 11:45</div>
                </div>
            );
        } else if (filters.lectures && day.getDay() === 5 && index === 2) {
            cellContent = (
                <div className={`green-block ${isCurrent ? 'current-interval' : ''}`}>
                    <div className="text-task">БЖД</div>
                    <div className="text-place">
					<img src={locations} alt="locations" className="locations" style={{ fill: '#ece9f2' }} />I римская</div>
                    <div className="text-time">
					<img src={time} alt="time" className="time" style={{ fill: '#ece9f2' }}/>12:00 - 13:30</div>
                </div>
            );
        } else if (filters.lectures && day.getDay() === 5 && index === 3) {
            cellContent = (
                <div className={`green-block ${isCurrent ? 'current-interval' : ''}`}>
                    <div className="text-task">БЖД, практика</div>
                    <div className="text-place">
					<img src={locations} alt="locations" className="locations" style={{ fill: '#ece9f2' }} />208 УК1</div>
                    <div className="text-time">
					<img src={time} alt="time" className="time" style={{ fill: '#ece9f2' }}/>14:15 - 15:45</div>
                </div>
            );
        }
		 if (filters.practicals && day.getDay() === 6 && index === 0) {
            cellContent = (
                <div className={`green-block ${isCurrent ? 'current-interval' : ''}`}>
                    <div className="text-task">Сети связи и системы коммутации</div>
                    <div className="text-place">
					<img src={locations} alt="locations" className="locations" style={{ fill: '#ece9f2' }} />VII римская</div>
                    <div className="text-time">
					<img src={time} alt="time" className="time" style={{ fill: '#ece9f2' }}/>8:30 - 10:00</div>
                </div>
            );
        } else if (filters.lectures && day.getDay() === 6 && index === 1) {
            cellContent = (
                <div className={`green-block ${isCurrent ? 'current-interval' : ''}`}>
                    <div className="text-task">Сети связи и системы коммутации</div>
                    <div className="text-place">
					<img src={locations} alt="locations" className="locations" style={{ fill: '#ece9f2' }} />VII римская</div>
                    <div className="text-time">
					<img src={time} alt="time" className="time" style={{ fill: '#ece9f2' }}/>10:00 - 11:45</div>
                </div>
            );
        } 
		else if (filters.lectures && day.getDay() === 4 && index === 0) {
            cellContent = (
                <div className={`laba ${isCurrent ? 'current-interval' : ''}`}>
                    <div className="text-task">Направляющие системы электросвязи</div>
                    <div className="text-place">
					<img src={locations} alt="locations" className="locations" style={{ fill: '#ece9f2' }} />110 УК3</div>
                    <div className="text-time">
					<img src={time} alt="time" className="time" style={{ fill: '#ece9f2' }}/>8:30 - 10:00</div>
                </div>
            );
        } else if (filters.lectures && day.getDay() === 4 && index === 1) {
            cellContent = (
                <div className={`practicals ${isCurrent ? 'current-interval' : ''}`}>
                    <div className="text-task">БЖД, практика</div>
                    <div className="text-place">
					<img src={locations} alt="locations" className="locations" style={{ fill: '#ece9f2' }} />208 УК1</div>
                    <div className="text-time">
					<img src={time} alt="time" className="time" style={{ fill: '#ece9f2' }}/>10:15 - 11:45</div>
                </div>
            );
        }
		 if (filters.practicals && day.getDay() === 4 && index === 2) {
            cellContent = (
                <div className={`green-block ${isCurrent ? 'current-interval' : ''}`}>
                    <div className="text-task">Оптоэлектроника и нанофотоника</div>
                    <div className="text-place">
					<img src={locations} alt="locations" className="locations" style={{ fill: '#ece9f2' }} />408 УК1</div>
                    <div className="text-time">
					<img src={time} alt="time" className="time" style={{ fill: '#ece9f2' }}/>12:00 - 13:30</div>
                </div>
            );
        } else if (filters.lectures && day.getDay() === 4 && index === 3) {
            cellContent = (
                <div className={`laba ${isCurrent ? 'current-interval' : ''}`}>
                    <div className="text-task">Оптоэлектроника и нанофотоника 1 п/гр</div>
                    <div className="text-place">
					<img src={locations} alt="locations" className="locations" style={{ fill: '#ece9f2' }} />403 УК1</div>
                    <div className="text-time">
					<img src={time} alt="time" className="time" style={{ fill: '#ece9f2' }}/>10:00 - 11:45</div>
                </div>
            );
        }

        // Проверяем, есть ли содержимое для рендеринга
        return (
            <tr key={index}>
                <td className="date-cell-mobile">
                    {cellContent ? cellContent : null}
                </td>
            </tr>
        );
    });
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
      { paranumber: "Шестая пара", start: "18:00", end: "19:30" },
    ];

    return timeIntervals.map((interval, index) => (
      <React.Fragment key={index}>
        <tr>
          <td className="time-cell">
            <div className="pair-name">{interval.paranumber}</div>
          </td>
          {days.map((day, dayIndex) => {
            const isCurrent = isWithinInterval(new Date(), {
              start: new Date(day.getFullYear(), day.getMonth(), day.getDate(), parseInt(interval.start.split(":")[0]), parseInt(interval.start.split(":")[1])),
              end: new Date(day.getFullYear(), day.getMonth(), day.getDate(), parseInt(interval.end.split(":")[0]), parseInt(interval.end.split(":")[1]))
            });

            return (
              <td key={dayIndex} className="date-cell-desktop">
                
              </td>
            );
          })}
        </tr>
      </React.Fragment>
    ));
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
            <h3>{monthYear}</h3>
            <button onClick={prevMonth}><img src={arrowLeft} alt="Previous Month" /></button>
            <button onClick={nextMonth}><img src={arrowRight} alt="Next Month" /></button>
          </div>
          <table className="month-calendar">
            <thead>
              <tr>{renderDaysOfWeek()}</tr>
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
      <div className="mobile-schedule-container">
	  <div className="group-name">
          <h2>TE-21Б</h2>
        </div>
	  <div className="week-navigation-mobile">
          <h2>{weekRange}</h2>
        </div>
        <div className="day-selector-container">
		<div className="data-prime">
      <h2>{getCurrentDate()}</h2> {/* Отображение текущей даты */}
      <table>
        <tbody>
          {/* Ваши строки таблицы здесь */}
        </tbody>
      </table>
    </div>
          <div className="day-selector">
  {daysOfWeek.map((day, i) => (
    <button
      key={i}
      className={`day-button ${selectedMobileDay.getDay() === i + 1 ? 'selected' : ''}`}
      onClick={() => setSelectedMobileDay(addDays(currentWeek, i))}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
		
        <div className="mobile-day-schedule">
          <table>
            <tbody>
              {renderMobileDaySchedule(selectedMobileDay)}
            </tbody>
          </table>
        </div>
      </div>
      <div className="daun-calendar">
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