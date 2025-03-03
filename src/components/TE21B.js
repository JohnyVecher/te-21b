import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TE21B.css';
import { useMemo } from 'react';
import laba_png from './laba.png'
import practicals_png from './practicals.png'
import lectures_png from './lectures.png'
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
	

  const startDate = new Date(2024, 8, 2);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { locale: ru }));
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMobileDay, setSelectedMobileDay] = useState(currentWeek);
  const [currentWeekNumber, setCurrentWeekNumber] = useState(
    differenceInWeeks(currentWeek, startDate) + 1
  );
 const [lessons, setLessons] = useState([]);
	const countLessonHours = useMemo(() => {
    const hours = { lectures: 0, practicals: 0, laba: 0 };

    lessons.forEach((lesson) => {
        if (Number(lesson.week_number) === currentWeekNumber) {
            hours[lesson.lesson_type] += 1; 
        }
    });

    return hours;
}, [lessons, currentWeekNumber]);

const lessonHours = countLessonHours;
  const daysOfWeek = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];



  const getSelectedDayDate = () => {
    if (!selectedMobileDay) return 'Выберите день';
 
    return format(selectedMobileDay, 'd.MM.yyyy', { locale: ru });
};

const [currentLesson, setCurrentLesson] = useState(null);
const [showNotification, setShowNotification] = useState(false);

useEffect(() => {
    const checkCurrentLesson = () => {
        const now = new Date();
        const currentDayOfWeek = now.getDay() || 7;

        const lessonTimes = [
            { start: "08:30", end: "10:00" },
            { start: "10:15", end: "11:45" },
            { start: "12:00", end: "13:30" },
            { start: "14:15", end: "15:45" },
            { start: "16:00", end: "17:30" },
            { start: "18:00", end: "19:30" },
            { start: "19:45", end: "21:00" }
        ];

        const lesson = lessons.find(lesson => {
            const lessonIndex = Number(lesson.lesson_index) - 1;
            if (lessonIndex < 0 || lessonIndex >= lessonTimes.length) return false;

            if (Number(lesson.day_of_week) !== currentDayOfWeek) return false; // Проверка дня

            const { start, end } = lessonTimes[lessonIndex];

            return isWithinInterval(now, {
                start: new Date(now.getFullYear(), now.getMonth(), now.getDate(),
                    parseInt(start.split(':')[0]), parseInt(start.split(':')[1])),
                end: new Date(now.getFullYear(), now.getMonth(), now.getDate(),
                    parseInt(end.split(':')[0]), parseInt(end.split(':')[1]))
            });
        });

        if (lesson) {
            setCurrentLesson(lesson);
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 5000);
        } else {
            setShowNotification(false);
        }
    };

    const interval = setInterval(checkCurrentLesson, 10000);
    checkCurrentLesson();

    return () => clearInterval(interval);
}, [lessons]);



useEffect(() => {
    if (currentWeekNumber === undefined) return; 

    const isMobile = window.innerWidth <= 768; 

    if (isMobile) {

        console.log("Мобильный запрос:", { week: currentWeekNumber, day: selectedMobileDay?.getDay() || 7 });

        const fetchMobileLessons = async () => {
            try {
                const dayOfWeek = selectedMobileDay ? selectedMobileDay.getDay() || 7 : 1;
                const response = await axios.get('https://backend-schedule-b6vy.onrender.com/api/lessons', {
                    params: { week: currentWeekNumber, day: dayOfWeek }
                });

                console.log("Данные с сервера (мобильная версия):", response.data);
                setLessons(response.data);
            } catch (error) {
                console.error('Ошибка загрузки занятий (мобильная версия):', error);
            }
        };

        fetchMobileLessons();
    } else {
        console.log("ПК-запрос на всю неделю:", { week: currentWeekNumber });

        const fetchLessonsForAllDays = async () => {
            try {
                const allDays = [1, 2, 3, 4, 5, 6, 7];
                const requests = allDays.map(day =>
                    axios.get('https://backend-schedule-b6vy.onrender.com/api/lessons', {
                        params: { week: currentWeekNumber, day }
                    })
                );

                const responses = await Promise.all(requests);
                const allLessons = responses.flatMap(response => response.data);

                console.log("Данные с сервера (ПК, вся неделя):", allLessons);
                setLessons(allLessons);
            } catch (error) {
                console.error('Ошибка загрузки занятий (ПК):', error);
            }
        };

        fetchLessonsForAllDays();
    }
}, [currentWeekNumber, selectedMobileDay]); 

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

const renderMobileDaySchedule = (day) => {
    const lessonTimes = {
        1: { paranumber: "Первая пара", start: "08:30", end: "10:00" },
        2: { paranumber: "Вторая пара", start: "10:15", end: "11:45" },
        3: { paranumber: "Третья пара", start: "12:00", end: "13:30" },
        4: { paranumber: "Четвертая пара", start: "14:15", end: "15:45" },
        5: { paranumber: "Пятая пара", start: "16:00", end: "17:30" },
        6: { paranumber: "Шестая пара", start: "18:00", end: "19:30" },
        7: { paranumber: "Седьмая пара", start: "19:45", end: "21:00" }
    };

    return Object.keys(lessonTimes).map((key) => {
        const lessonIndex = parseInt(key);
        const timeRange = `${lessonTimes[lessonIndex].start} - ${lessonTimes[lessonIndex].end}`;
        const lesson = lessons.find((l) => 
            Number(l.lesson_index) === lessonIndex &&
            Number(l.day_of_week) === (day.getDay() || 7) // Проверяем день недели
        );

        const now = new Date();
        const isCurrent = lesson && isWithinInterval(now, {
            start: new Date(day.getFullYear(), day.getMonth(), day.getDate(),
                parseInt(lessonTimes[lessonIndex].start.split(":")[0]), 
                parseInt(lessonTimes[lessonIndex].start.split(":")[1])),
            end: new Date(day.getFullYear(), day.getMonth(), day.getDate(),
                parseInt(lessonTimes[lessonIndex].end.split(":")[0]), 
                parseInt(lessonTimes[lessonIndex].end.split(":")[1]))
        });

        return (
            <tr key={lessonIndex}>
                <td className="date-cell-mobile">
                    {lesson ? (
                        <div className={`${lesson.lesson_type} ${isCurrent ? 'current-interval' : ''}`}>
                            <div className="type-label">{getTypeLabel(lesson.lesson_type)}</div>
                            <div className="text-task">{lesson.subject}</div>
                            <div className="text-place">
                                <img src={locations} alt="locations" className="locations" />
                                {lesson.location}
                            </div>
                            <div className="text-time">
                                <img src={time} alt="time" className="time" />
                                {timeRange}
                            </div>
                        </div>
                    ) : null}
                </td>
            </tr>
        );
    });
};



  const renderWeek = (lessons = [], currentWeekNumber) => {
    
    const startDate = startOfWeek(currentWeek, { locale: ru, weekStartsOn: 1 });
    const days = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

    const timeIntervals = [
        { paranumber: "Первая пара", start: "08:30", end: "10:00" },
        { paranumber: "Вторая пара", start: "10:15", end: "11:45" },
        { paranumber: "Третья пара", start: "12:00", end: "13:30" },
        { paranumber: "Четвертая пара", start: "14:15", end: "15:45" },
        { paranumber: "Пятая пара", start: "16:00", end: "17:30" },
        { paranumber: "Шестая пара", start: "18:00", end: "19:30" },
    ];

    return timeIntervals.map((interval, lessonIndex) => (
        <React.Fragment key={lessonIndex}>
            <tr>
                <td className="time-cell">
                    <div className="pair-name">{interval.paranumber}</div>
                </td>
                {days.map((day, dayIndex) => {
                    const isCurrent = isWithinInterval(new Date(), {
                        start: new Date(day.getFullYear(), day.getMonth(), day.getDate(),
                            parseInt(interval.start.split(":")[0]), 
                            parseInt(interval.start.split(":")[1])),
                        end: new Date(day.getFullYear(), day.getMonth(), day.getDate(),
                            parseInt(interval.end.split(":")[0]), 
                            parseInt(interval.end.split(":")[1]))
                    });

                    const timeRange = `${interval.start} - ${interval.end}`;

            
                    const lesson = lessons.find(l => 
    Number(l.day_of_week) === (day.getDay() || 7) &&
    Number(l.lesson_index) === lessonIndex + 1 && 
    Number(l.week_number) === currentWeekNumber
);


                    let cellContent = null;

                    if (lesson && filters?.[lesson.lesson_type]) {
                        cellContent = (
                            <div className={`${lesson.lesson_type} ${isCurrent ? 'current-interval' : ''}`}>
                                <div className="type-label">{getTypeLabel(lesson.lesson_type)}</div>
                                <div className="text-task">{lesson.subject}</div>
								<div className="lesson-footer">
                                <div className="text-place">
                                    <img src={locations} alt="locations" className="locations" />
                                    {lesson.location}
                                </div>
                                <div className="text-time">
                                    <img src={time} alt="time" className="time" />
                                    {timeRange}
                                </div>
								</div>
                            </div>
                        );
                    }

                    

                    return (
                        <td key={dayIndex} className="date-cell-desktop">
                            {cellContent}
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
            <label htmlFor="lectures">
    Лекции <span style={{ color: '#e61c66', fontWeight: 'bold' }}>{lessonHours.lectures} пар</span>
</label>
        </li>
        <li>
            <input type="checkbox" id="practicals" checked={filters.practicals} onChange={handleFilterChange} />
            <label htmlFor="practicals">
    Практика <span style={{ color: '#fc4a1a', fontWeight: 'bold' }}>{lessonHours.practicals} пар</span>
</label>
        </li>
        <li>
            <input type="checkbox" id="laba" checked={filters.laba} onChange={handleFilterChange} />
            <label htmlFor="laba">
    Лабораторные <span style={{ color: '#8450DE', fontWeight: 'bold' }}>{lessonHours.laba} пар</span>
</label>
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
<div className="activity-daun">
    <ul className="activity-list">
        <li>
            <img src={lectures_png} alt="Лекции" />
            <span style={{ color: '#e61c66', fontWeight: 'bold' }}>{lessonHours.lectures} пар</span>
        </li>
        <li>
            <img src={practicals_png} alt="Практика" />
            <span style={{ color: '#fc4a1a', fontWeight: 'bold' }}>{lessonHours.practicals} пар</span>
        </li>
        <li>
            <img src={laba_png} alt="Лабораторные" />
            <span style={{ color: '#8450DE', fontWeight: 'bold' }}>{lessonHours.laba} пар</span>
        </li>
    </ul>
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
	

          <table>
            <tbody>
              {renderMobileDaySchedule(selectedMobileDay)}
            </tbody>
          </table>
        </div>
      </div>
      <div className="daun-calendar">
        <div className="week-navigation">
		 <div className="buttons_week">
          <button onClick={prevWeek}><img src={arrowLeftWeek} alt="Previous Week" /></button>
          <h2>{weekRange}</h2>
          <button onClick={nextWeek}><img src={arrowRightWeek} alt="Next Week" /></button>
		  </div>
		  <div className="group-name">
        <h2>TE-21Б</h2>
         </div>
        </div>
        <table className="week-table">
          <thead>
            <tr>
              <th></th>
              {renderDaysOfWeek()}
            </tr>
          </thead>
          <tbody>
            {renderWeek(lessons, currentWeekNumber)}
          </tbody>
        </table>
      </div>
	  {currentLesson && (
    <div className={`current-lesson-notification ${showNotification ? 'show' : 'hide'}`}>
    У тебя сейчас пара: <strong>{currentLesson?.subject}</strong>
    </div>
)}
    </div>
  );
};

export default Calendar;