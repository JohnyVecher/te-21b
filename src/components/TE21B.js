import React, { useState, useEffect } from 'react';
import './TE21B.css';
import arrowLeft from './arrow_left.png';
import { ThemeContext } from './ThemeContext';
import locations from './locationsr.png';
import time from './time.png';
import arrowRight from './arrow_right.png';
import arrowLeftWeek from './arrow_left_week.png';
import arrowLeftWeekMobile from './arrow_left_week_mobile.png';
import arrowback from './backarrow.png';
import arrowRightWeek from './arrow_right_week.png';
import arrowRightWeekMobile from './arrow_right_week_mobile.png';
import { isWithinInterval } from 'date-fns';
import axios from 'axios';
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
  addDays,
  differenceInWeeks
} from 'date-fns';
import { ru } from 'date-fns/locale';

const getMonthNameInGenitive = (date) => {
  const monthsInGenitive = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
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
  const startDate = new Date(2024, 8, 2); // 2 сентября 2023 года - начало первой недели
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { locale: ru }));
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMobileDay, setSelectedMobileDay] = useState(currentWeek);
  const [currentWeekNumber, setCurrentWeekNumber] = useState(
    differenceInWeeks(currentWeek, startDate) + 1
  );

  const daysOfWeek = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];

  const getSelectedDayDate = () => {
    if (!selectedMobileDay) return 'Выберите день';

    // Форматируем выбранную дату в строку вида "5.11.2024"
    return format(selectedMobileDay, 'd.MM.yyyy', { locale: ru });
};

useEffect(() => {
    setSelectedMobileDay(addDays(currentWeek, selectedMobileDay.getDay() - 1));
  }, [currentWeek]);



  const prevWeek = () => {
    const newWeek = subWeeks(currentWeek, 1);
    setCurrentWeek(newWeek);
    setCurrentWeekNumber(differenceInWeeks(newWeek, startDate) + 1);
  };

  const nextWeek = () => {
    const newWeek = addWeeks(currentWeek, 1);
    setCurrentWeek(newWeek);
    setCurrentWeekNumber(differenceInWeeks(newWeek, startDate) + 1);
  };

  const weekStartDay = format(startOfWeek(currentWeek, { locale: ru, weekStartsOn: 1 }), 'd');
  const weekEndDay = format(endOfWeek(currentWeek, { locale: ru, weekStartsOn: 1 }), 'd');
  const weekRange = `${getMonthNameInGenitive(currentWeek)} ${weekStartDay} - ${weekEndDay}, ${format(currentWeek, 'yyyy')}`;

  const [filters, setFilters] = useState({
    lectures: true,
    practicals: true,
    laba: true
  });

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

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

  const renderDaysOfWeek = () => {
    const daysOfWeek = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
    return daysOfWeek.map((day, index) => (
      <th key={index} className="week-table-cell">{day}</th>
    ));
  };


const getTypeLabel = (className) => {
    switch (className) {
        case 'practicals':
            return 'Практика';
        case 'laba':
            return 'Лабораторная';
        case 'lectures':
            return 'Лекция';
        default:
            return 'Занятие';
    }
};

const ScheduleRenderer = ({ day, currentWeekNumber }) => {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get('/api/classes'); // URL бэкенда на Vercel
                setClasses(response.data);
            } catch (error) {
                console.error("Ошибка при получении данных:", error);
            }
        };
        fetchClasses();
    }, []);

    const timeIntervals = [
        { paranumber: "Первая пара", start: "08:30", end: "10:00" },
        { paranumber: "Вторая пара", start: "10:15", end: "11:45" },
        { paranumber: "Третья пара", start: "12:00", end: "13:30" },
        { paranumber: "Четвертая пара", start: "14:15", end: "15:45" },
        { paranumber: "Пятая пара", start: "16:00", end: "17:30" },
        { paranumber: "Шестая пара", start: "18:00", end: "19:30" },
    ];

    // Функция рендеринга расписания
    const renderMobileDaySchedule = () => {
        return timeIntervals.map((interval, index) => {
            const isCurrent = isWithinInterval(new Date(), {
                start: new Date(day.getFullYear(), day.getMonth(), day.getDate(), parseInt(interval.start.split(":")[0]), parseInt(interval.start.split(":")[1])),
                end: new Date(day.getFullYear(), day.getMonth(), day.getDate(), parseInt(interval.end.split(":")[0]), parseInt(interval.end.split(":")[1]))
            });

            const timeRange = `${interval.start} - ${interval.end}`;
            let cellContent = null;

            const classForInterval = classes.find((item) => {
                return (
                    item.day_of_week === day.getDay() &&
                    item.week_number === currentWeekNumber &&
                    item.paranumber === interval.paranumber
                );
            });

            if (classForInterval) {
                const blockClass = classForInterval.type;
                cellContent = (
                    <div className={`${blockClass} ${isCurrent ? 'current-interval' : ''}`}>
                        <div className="type-label">{getTypeLabel(blockClass)}</div>
                        <div className="text-task">{classForInterval.task_name}</div>
                        <div className="text-place">
                            <img src={locations} alt="locations" className="locations" style={{ fill: '#ece9f2' }} />
                            {classForInterval.location}
                        </div>
                        <div className="text-time">
                            <img src={time} alt="time" className="time" style={{ fill: '#ece9f2' }} />
                            {timeRange}
                        </div>
                    </div>
                );
            }

            return (
                <tr key={index}>
                    <td className="date-cell-mobile">
                        {cellContent ? cellContent : null}
                    </td>
                </tr>
            );
        });
    };

    return (
        <table>
            <tbody>
                {renderMobileDaySchedule()}
            </tbody>
        </table>
    );
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
	     <div className="header-container">
    <button className="back-button" onClick={() => window.history.back()}>
        <img src={arrowback} alt="Back" className="back-arrow" />
    </button>
    <div className="group-name">
        <h2>TE-21Б</h2>
    </div>
</div>

	  <div className="week-navigation-mobile">
          <button onClick={prevWeek}><img src={arrowLeftWeekMobile} alt="Previous-Week" /></button>
          <h2>{`${weekRange}`}</h2>
          <button onClick={nextWeek}><img src={arrowRightWeekMobile} alt="Next-Week" /></button>
        </div>

        <div className="day-selector-container">
          <div className="data-prime">
        <h2>{getSelectedDayDate()}</h2> {}
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