import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TE21B.css';
import { useMemo } from 'react';
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
	

// Теперь lessonHours доступен в JSX

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
        if (lesson.week_number === currentWeekNumber) {
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



useEffect(() => {
    if (currentWeekNumber === undefined) return; 

    const isMobile = window.innerWidth <= 768; 

    if (isMobile) {

        console.log("Мобильный запрос:", { week: currentWeekNumber, day: selectedMobileDay?.getDay() || 7 });

        const fetchMobileLessons = async () => {
            try {
                const dayOfWeek = selectedMobileDay ? selectedMobileDay.getDay() || 7 : 1;
                const response = await axios.get('http://localhost:3001/api/lessons', {
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
                    axios.get('http://localhost:3001/api/lessons', {
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
        6: { paranumber: "Шестая пара", start: "18:00", end: "19:30" }
    };

    return Object.keys(lessonTimes).map((key) => {
        const lessonIndex = parseInt(key);
        const timeRange = `${lessonTimes[lessonIndex].start} - ${lessonTimes[lessonIndex].end}`;
        const lesson = lessons.find((l) => l.lesson_index === lessonIndex);

        return (
            <tr key={lessonIndex}>
                <td className="date-cell-mobile">
                    {lesson ? (
                        <div className={`${lesson.lesson_type} ${lesson.isCurrent ? 'current-interval' : ''}`}>
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
                        l.day_of_week === (day.getDay() || 7) &&
                        l.lesson_index === lessonIndex + 1 && // +1, т.к. индексы начинаются с 0
                        l.week_number === currentWeekNumber
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


<<<<<<< HEAD
=======
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
                        start: new Date(day.getFullYear(), day.getMonth(), day.getDate(),
                            parseInt(interval.start.split(":")[0]), 
                            parseInt(interval.start.split(":")[1])),
                        end: new Date(day.getFullYear(), day.getMonth(), day.getDate(),
                            parseInt(interval.end.split(":")[0]), 
                            parseInt(interval.end.split(":")[1]))
                    });

                    const timeRange = `${interval.start} - ${interval.end}`;
                    let cellContent = null;

                     if (filters.practicals && day.getDay() === 2 && index === 0 && currentWeekNumber === 23) {
            const blockClass = 'practicals';

            cellContent = (
                <div className={`${blockClass} ${isCurrent ? 'current-interval' : ''}`}>
				<div className="type-label">{getTypeLabel(blockClass)}</div>
                    <div className="text-task">Проектная деятельность</div>
                    <div className="text-place">
                        <img src={locations} alt="locations" className="locations" style={{ fill: '#ece9f2' }} />
                        420 УК 3
                    </div>
                    <div className="text-time">
                        <img src={time} alt="time" className="time" style={{ fill: '#ece9f2' }} />
                        {timeRange}
                    </div>
                </div>
            );
        } if (filters.laba && day.getDay() === 2 && index === 1 && currentWeekNumber === 23) {
			const blockClass = 'laba';
			
            cellContent = (
                <div className={`${blockClass} ${isCurrent ? 'current-interval' : ''}`}>
				<div className="type-label">{getTypeLabel(blockClass)}</div>
                    <div className="text-task">Компьютерное моделирование</div>
                    <div className="text-place">
					<img src={locations} alt="locations" className="locations" style={{ fill: '#ece9f2' }} />
                    406 УК 3
                    </div>
                    <div className="text-time">
					<img src={time} alt="time" className="time" style={{ fill: '#ece9f2' }}/>
					{timeRange}
					</div>
                </div>
            );
        } if (filters.laba && day.getDay() === 2 && index === 2 && currentWeekNumber === 23) {
            const blockClass = 'laba';
			
			cellContent = (
                <div className={`${blockClass} ${isCurrent ? 'current-interval' : ''}`}>
				<div className="type-label">{getTypeLabel(blockClass)}</div>
                    <div className="text-task">Обработка экспериментальных данных 1 п/гр</div>
                    <div className="text-place">
					<img src={locations} alt="locations" className="locations" style={{ fill: '#ece9f2' }} />
                    403 УК 1
                    </div>
                    <div className="text-time">
					<img src={time} alt="time" className="time" style={{ fill: '#ece9f2' }}/>
					{timeRange}
					</div>
                </div>
            );
        } if (filters.laba && day.getDay() === 3 && index === 1 && currentWeekNumber === 23) {
           const blockClass = 'laba';
		   
		   cellContent = (
                <div className={`${blockClass} ${isCurrent ? 'current-interval' : ''}`}>
				<div className="type-label">{getTypeLabel(blockClass)}</div>
                    <div className="text-task">Сети связи и системы коммутации 2 п/гр</div>
                    <div className="text-place">
					<img src={locations} alt="locations" className="locations" style={{ fill: '#ece9f2' }} />
                    406 УК 3
                    </div>
                    <div className="text-time">
					<img src={time} alt="time" className="time" style={{ fill: '#ece9f2' }}/>
					{timeRange}
					</div>
                </div>
            );
        } 
		if (filters.laba && day.getDay() === 3 && index === 2 && currentWeekNumber === 23) {
            const blockClass = 'laba';
			
			cellContent = (
                <div className={`${blockClass} ${isCurrent ? 'current-interval' : ''}`}>
				<div className="type-label">{getTypeLabel(blockClass)}</div>
                    <div className="text-task">Сети связи и системы коммутации 1 п/гр | Оптоэлектроника и нанофотоника 2 п/гр</div>
                    <div className="text-place">
					<img src={locations} alt="locations" className="locations" style={{ fill: '#ece9f2' }} />
                    209 УК 3 | 403 УК 1
                    </div>
                    <div className="text-time">
					<img src={time} alt="time" className="time" style={{ fill: '#ece9f2' }}/>
					{timeRange}
					</div>
                </div>
            );
        } 
		if (filters.practicals && day.getDay() === 3 && index === 3 && currentWeekNumber === 23) {
            const blockClass = 'practicals';
			
			cellContent = (
               <div className={`${blockClass} ${isCurrent ? 'current-interval' : ''}`}>
			   <div className="type-label">{getTypeLabel(blockClass)}</div>
                    <div className="text-task">Сети связи и системы коммутации</div>
                    <div className="text-place">
					<img src={locations} alt="locations" className="locations" style={{ fill: '#ece9f2' }} />
                    209 УК 3
                    </div>
                    <div className="text-time">
					<img src={time} alt="time" className="time" style={{ fill: '#ece9f2' }}/>
					{timeRange}
					</div>
                </div>
            );
        } if (filters.practicals && day.getDay() === 3 && index === 4 && currentWeekNumber === 23) {
            const blockClass = 'practicals';
			
			cellContent = (
                <div className={`${blockClass} ${isCurrent ? 'current-interval' : ''}`}>
				<div className="type-label">{getTypeLabel(blockClass)}</div>
                    <div className="text-task">Элективные дисциплины по физической культуре и спорту</div>
                    <div className="text-place">
					<img src={locations} alt="locations" className="locations" style={{ fill: '#ece9f2' }} />
                    Спорт зал
                    </div>
                    <div className="text-time">
					<img src={time} alt="time" className="time" style={{ fill: '#ece9f2' }}/>
					{timeRange}
					</div>
                </div>
            );
        } if (filters.laba && day.getDay() === 4 && index === 0 && currentWeekNumber === 23) {
           const blockClass = 'laba';

		   cellContent = (
                <div className={`${blockClass} ${isCurrent ? 'current-interval' : ''}`}>
				<div className="type-label">{getTypeLabel(blockClass)}</div>
                    <div className="text-task">Направляющие системы электросвязи</div>
                    <div className="text-place">
					<img src={locations} alt="locations" className="locations" style={{ fill: '#ece9f2' }} />
                    110 УК 3
                    </div>
                    <div className="text-time">
					<img src={time} alt="time" className="time" style={{ fill: '#ece9f2' }}/>
					{timeRange}
					</div>
                </div>
            );
        } if (filters.laba && day.getDay() === 4 && index === 1 && currentWeekNumber === 23) {
            const blockClass = 'practicals';
			
			cellContent = (
                <div className={`${blockClass} ${isCurrent ? 'current-interval' : ''}`}>
				<div className="type-label">{getTypeLabel(blockClass)}</div>
                    <div className="text-task">Безопасность жизнедеятельностии</div>
                    <div className="text-place">
					<img src={locations} alt="locations" className="locations" style={{ fill: '#ece9f2' }} />
                    208 УК 1
                    </div>
                    <div className="text-time">
					<img src={time} alt="time" className="time" style={{ fill: '#ece9f2' }}/>
					{timeRange}
					</div>
                </div>
            );
        } if (filters.laba && day.getDay() === 4 && index === 2 && currentWeekNumber === 23) {
            const blockClass = 'lectures';
			
			cellContent = (
                <div className={`${blockClass} ${isCurrent ? 'current-interval' : ''}`}>
				<div className="type-label">{getTypeLabel(blockClass)}</div>
                    <div className="text-task">Оптоэлектроника и нанофотоника</div>
                    <div className="text-place">
					<img src={locations} alt="locations" className="locations" style={{ fill: '#ece9f2' }} />
                    408 УК 1
                    </div>
                    <div className="text-time">
					<img src={time} alt="time" className="time" style={{ fill: '#ece9f2' }}/>
					{timeRange}
					</div>
                </div>
            );
        } if (filters.practicals && day.getDay() === 4 && index === 3 && currentWeekNumber === 23) {
            const blockClass = 'practicals';
			
			cellContent = (
                <div className={`${blockClass} ${isCurrent ? 'current-interval' : ''}`}>
				<div className="type-label">{getTypeLabel(blockClass)}</div>
                    <div className="text-task">Оптоэлектроника и нанофотоника</div>
                    <div className="text-place">
					<img src={locations} alt="locations" className="locations" style={{ fill: '#ece9f2' }} />
                    403 УК 1
                    </div>
                    <div className="text-time">
					<img src={time} alt="time" className="time" style={{ fill: '#ece9f2' }}/>
					{timeRange}
					</div>
                </div>
            );
        } if (filters.practicals && day.getDay() === 4 && index === 4 && currentWeekNumber === 23) {
            const blockClass = 'laba';
			
			cellContent = (
                <div className={`${blockClass} ${isCurrent ? 'current-interval' : ''}`}>
				<div className="type-label">{getTypeLabel(blockClass)}</div>
                    <div className="text-task">Оптоэлектроника и нанофотоника 2 п/гр</div>
                    <div className="text-place">
					<img src={locations} alt="locations" className="locations" style={{ fill: '#ece9f2' }} />
                    403 УК 1
                    </div>
                    <div className="text-time">
					<img src={time} alt="time" className="time" style={{ fill: '#ece9f2' }}/>
					{timeRange}
					</div>
                </div>
            );
        }if (filters.practicals && day.getDay() === 5 && index === 0 && currentWeekNumber === 23) {
            const blockClass = 'practicals';
			
			cellContent = (
                <div className={`${blockClass} ${isCurrent ? 'current-interval' : ''}`}>
				<div className="type-label">{getTypeLabel(blockClass)}</div>
                    <div className="text-task">Элективные дисциплины по физической культуре и спорту</div>
                    <div className="text-place">
					<img src={locations} alt="locations" className="locations" style={{ fill: '#ece9f2' }} />
                    Спорт зал
                    </div>
                    <div className="text-time">
					<img src={time} alt="time" className="time" style={{ fill: '#ece9f2' }}/>
					{timeRange}
					</div>
                </div>
            );
        } if (filters.practicals && day.getDay() === 5 && index === 1 && currentWeekNumber === 23) {
            const blockClass = 'lectures';
			
			cellContent = (
             <div className={`${blockClass} ${isCurrent ? 'current-interval' : ''}`}>
			 <div className="type-label">{getTypeLabel(blockClass)}</div>
                    <div className="text-task">Направляющие системы электросвязи</div>
                    <div className="text-place">
					<img src={locations} alt="locations" className="locations" style={{ fill: '#ece9f2' }} />
                    VIII римская
                    </div>
                    <div className="text-time">
					<img src={time} alt="time" className="time" style={{ fill: '#ece9f2' }}/>
					{timeRange}
					</div>
                </div>
            );
        } if (filters.practicals && day.getDay() === 5 && index === 2 && currentWeekNumber === 23) {
           const blockClass = 'lectures';

		   cellContent = (
                    <div className={`${blockClass} ${isCurrent ? 'current-interval' : ''}`}>
					<div className="type-label">{getTypeLabel(blockClass)}</div>
                    <div className="text-task">Безопасность жизнедеятельности</div>
                    <div className="text-place">
					<img src={locations} alt="locations" className="locations" style={{ fill: '#ece9f2' }} />
                    I римская
                    </div>
                    <div className="text-time">
					<img src={time} alt="time" className="time" style={{ fill: '#ece9f2' }}/>
					{timeRange}
					</div>
                </div>
            );
        } if (filters.practicals && day.getDay() === 5 && index === 3 && currentWeekNumber === 23) {
            const blockClass = 'practicals';    
			
			cellContent = (
                    <div className={`${blockClass} ${isCurrent ? 'current-interval' : ''}`}>
					<div className="type-label">{getTypeLabel(blockClass)}</div>
                    <div className="text-task">Безопасность жизнедеятельности</div>
                    <div className="text-place">
					<img src={locations} alt="locations" className="locations" style={{ fill: '#ece9f2' }} />
                    213 УК 1
                    </div>
                    <div className="text-time">
					<img src={time} alt="time" className="time" style={{ fill: '#ece9f2' }}/>
					{timeRange}
					</div>
                </div>
            );
			} if (filters.practicals && day.getDay() === 1 && index === 0 && currentWeekNumber === 24) {
            const blockClass = 'lectures';

            cellContent = (
                <div className={`${blockClass} ${isCurrent ? 'current-interval' : ''}`}>
				<div className="type-label">{getTypeLabel(blockClass)}</div>
                    <div className="text-task">Компьютерное моделирование</div>
                    <div className="text-place">
                        <img src={locations} alt="locations" className="locations" style={{ fill: '#ece9f2' }} />
                        VII римская
                    </div>
                    <div className="text-time">
                        <img src={time} alt="time" className="time" style={{ fill: '#ece9f2' }} />
                        {timeRange}
                    </div>
                </div>
            );
        } if (filters.laba && day.getDay() === 1 && index === 1 && currentWeekNumber === 24) {
			const blockClass = 'lectures';
			
            cellContent = (
                <div className={`${blockClass} ${isCurrent ? 'current-interval' : ''}`}>
				<div className="type-label">{getTypeLabel(blockClass)}</div>
                    <div className="text-task">Сети связи и системы коммутации</div>
                    <div className="text-place">
					<img src={locations} alt="locations" className="locations" style={{ fill: '#ece9f2' }} />
                    VIII римская
                    </div>
                    <div className="text-time">
					<img src={time} alt="time" className="time" style={{ fill: '#ece9f2' }}/>
					{timeRange}
					</div>
                </div>
            );
        } if (filters.laba && day.getDay() === 1 && index === 2 && currentWeekNumber === 24) {
            const blockClass = 'practicals';
			
			cellContent = (
                <div className={`${blockClass} ${isCurrent ? 'current-interval' : ''}`}>
				<div className="type-label">{getTypeLabel(blockClass)}</div>
                    <div className="text-task">Направляющие системы электросвязи</div>
                    <div className="text-place">
					<img src={locations} alt="locations" className="locations" style={{ fill: '#ece9f2' }} />
                    VII римская
                    </div>
                    <div className="text-time">
					<img src={time} alt="time" className="time" style={{ fill: '#ece9f2' }}/>
					{timeRange}
					</div>
                </div>
            );
        }  if (filters.laba && day.getDay() === 2 && index === 0 && currentWeekNumber === 24) {
			const blockClass = 'laba';
			
            cellContent = (
                <div className={`${blockClass} ${isCurrent ? 'current-interval' : ''}`}>
				<div className="type-label">{getTypeLabel(blockClass)}</div>
                    <div className="text-task">Сети связи и системы коммутации 2 п/гр </div>
                    <div className="text-place">
					<img src={locations} alt="locations" className="locations" style={{ fill: '#ece9f2' }} />
                    406 УК 3
                    </div>
                    <div className="text-time">
					<img src={time} alt="time" className="time" style={{ fill: '#ece9f2' }}/>
					{timeRange}
					</div>
                </div>
            );
        }if (filters.laba && day.getDay() === 2 && index === 1 && currentWeekNumber === 24) {
			const blockClass = 'laba';
			
            cellContent = (
                <div className={`${blockClass} ${isCurrent ? 'current-interval' : ''}`}>
				<div className="type-label">{getTypeLabel(blockClass)}</div>
                    <div className="text-task">Компьютерное моделирование</div>
                    <div className="text-place">
					<img src={locations} alt="locations" className="locations" style={{ fill: '#ece9f2' }} />
                    406 УК 3
                    </div>
                    <div className="text-time">
					<img src={time} alt="time" className="time" style={{ fill: '#ece9f2' }}/>
					{timeRange}
					</div>
                </div>
            );
        } if (filters.laba && day.getDay() === 2 && index === 2 && currentWeekNumber === 24) {
            const blockClass = 'laba';
			
			cellContent = (
                <div className={`${blockClass} ${isCurrent ? 'current-interval' : ''}`}>
				<div className="type-label">{getTypeLabel(blockClass)}</div>
                    <div className="text-task">Обработка экспериментальных данных 1 п/гр / Многоканальные телекоммуникационные системы 2 п/гр</div>
                    <div className="text-place">
					<img src={locations} alt="locations" className="locations" style={{ fill: '#ece9f2' }} />
                    403 УК 1 / 301 УК 3
                    </div>
                    <div className="text-time">
					<img src={time} alt="time" className="time" style={{ fill: '#ece9f2' }}/>
					{timeRange}
					</div>
                </div>
            );
        } if (filters.laba && day.getDay() === 3 && index === 1 && currentWeekNumber === 24) {
           const blockClass = 'laba';
		   
		   cellContent = (
                <div className={`${blockClass} ${isCurrent ? 'current-interval' : ''}`}>
				<div className="type-label">{getTypeLabel(blockClass)}</div>
                    <div className="text-task">Сети связи и системы коммутации 2 п/гр</div>
                    <div className="text-place">
					<img src={locations} alt="locations" className="locations" style={{ fill: '#ece9f2' }} />
                    406 УК 3
                    </div>
                    <div className="text-time">
					<img src={time} alt="time" className="time" style={{ fill: '#ece9f2' }}/>
					{timeRange}
					</div>
                </div>
            );
        } 
		if (filters.laba && day.getDay() === 3 && index === 2 && currentWeekNumber === 24) {
            const blockClass = 'laba';
			
			cellContent = (
                <div className={`${blockClass} ${isCurrent ? 'current-interval' : ''}`}>
				<div className="type-label">{getTypeLabel(blockClass)}</div>
                    <div className="text-task">Сети связи и системы коммутации 1 п/гр | Оптоэлектроника и нанофотоника 2 п/гр</div>
                    <div className="text-place">
					<img src={locations} alt="locations" className="locations" style={{ fill: '#ece9f2' }} />
                    209 УК 3 | 403 УК 1
                    </div>
                    <div className="text-time">
					<img src={time} alt="time" className="time" style={{ fill: '#ece9f2' }}/>
					{timeRange}
					</div>
                </div>
            );
        } 
		if (filters.practicals && day.getDay() === 3 && index === 3 && currentWeekNumber === 24) {
            const blockClass = 'laba';
			
			cellContent = (
               <div className={`${blockClass} ${isCurrent ? 'current-interval' : ''}`}>
			   <div className="type-label">{getTypeLabel(blockClass)}</div>
                    <div className="text-task">Сети связи и системы коммутации 1 п/гр / Многоканальные телекоммуникационные системы 2 п/гр</div>
                    <div className="text-place">
					<img src={locations} alt="locations" className="locations" style={{ fill: '#ece9f2' }} />
                    209 УК 3 / 301 УК 3
                    </div>
                    <div className="text-time">
					<img src={time} alt="time" className="time" style={{ fill: '#ece9f2' }}/>
					{timeRange}
					</div>
                </div>
            );
        } if (filters.practicals && day.getDay() === 3 && index === 4 && currentWeekNumber === 24) {
            const blockClass = 'laba';
			
			cellContent = (
                <div className={`${blockClass} ${isCurrent ? 'current-interval' : ''}`}>
				<div className="type-label">{getTypeLabel(blockClass)}</div>
                    <div className="text-task">Перспективные технологии</div>
                    <div className="text-place">
					<img src={locations} alt="locations" className="locations" style={{ fill: '#ece9f2' }} />
                    202 УК 3
                    </div>
                    <div className="text-time">
					<img src={time} alt="time" className="time" style={{ fill: '#ece9f2' }}/>
					{timeRange}
					</div>
                </div>
            );
        } if (filters.laba && day.getDay() === 4 && index === 0 && currentWeekNumber === 24) {
           const blockClass = 'laba';

		   cellContent = (
                <div className={`${blockClass} ${isCurrent ? 'current-interval' : ''}`}>
				<div className="type-label">{getTypeLabel(blockClass)}</div>
                    <div className="text-task">Направляющие системы электросвязи</div>
                    <div className="text-place">
					<img src={locations} alt="locations" className="locations" style={{ fill: '#ece9f2' }} />
                    240 УК 3
                    </div>
                    <div className="text-time">
					<img src={time} alt="time" className="time" style={{ fill: '#ece9f2' }}/>
					{timeRange}
					</div>
                </div>
            );
        } if (filters.laba && day.getDay() === 4 && index === 1 && currentWeekNumber === 24) {
            const blockClass = 'practicals';
			
			cellContent = (
                <div className={`${blockClass} ${isCurrent ? 'current-interval' : ''}`}>
				<div className="type-label">{getTypeLabel(blockClass)}</div>
                    <div className="text-task">Безопасность жизнедеятельностии</div>
                    <div className="text-place">
					<img src={locations} alt="locations" className="locations" style={{ fill: '#ece9f2' }} />
                    208 УК 1
                    </div>
                    <div className="text-time">
					<img src={time} alt="time" className="time" style={{ fill: '#ece9f2' }}/>
					{timeRange}
					</div>
                </div>
            );
        } if (filters.laba && day.getDay() === 4 && index === 2 && currentWeekNumber === 24) {
            const blockClass = 'lectures';
			
			cellContent = (
                <div className={`${blockClass} ${isCurrent ? 'current-interval' : ''}`}>
				<div className="type-label">{getTypeLabel(blockClass)}</div>
                    <div className="text-task">Оптоэлектроника и нанофотоника</div>
                    <div className="text-place">
					<img src={locations} alt="locations" className="locations" style={{ fill: '#ece9f2' }} />
                    408 УК 1
                    </div>
                    <div className="text-time">
					<img src={time} alt="time" className="time" style={{ fill: '#ece9f2' }}/>
					{timeRange}
					</div>
                </div>
            );
        } if (filters.practicals && day.getDay() === 4 && index === 3 && currentWeekNumber === 24) {
            const blockClass = 'practicals';
			
			cellContent = (
                <div className={`${blockClass} ${isCurrent ? 'current-interval' : ''}`}>
				<div className="type-label">{getTypeLabel(blockClass)}</div>
                    <div className="text-task">Оптоэлектроника и нанофотоника</div>
                    <div className="text-place">
					<img src={locations} alt="locations" className="locations" style={{ fill: '#ece9f2' }} />
                    403 УК 1
                    </div>
                    <div className="text-time">
					<img src={time} alt="time" className="time" style={{ fill: '#ece9f2' }}/>
					{timeRange}
					</div>
                </div>
            );
        } if (filters.practicals && day.getDay() === 4 && index === 4 && currentWeekNumber === 24) {
            const blockClass = 'laba';
			
			cellContent = (
                <div className={`${blockClass} ${isCurrent ? 'current-interval' : ''}`}>
				<div className="type-label">{getTypeLabel(blockClass)}</div>
                    <div className="text-task">Оптоэлектроника и нанофотоника 2 п/гр</div>
                    <div className="text-place">
					<img src={locations} alt="locations" className="locations" style={{ fill: '#ece9f2' }} />
                    403 УК 1
                    </div>
                    <div className="text-time">
					<img src={time} alt="time" className="time" style={{ fill: '#ece9f2' }}/>
					{timeRange}
					</div>
                </div>
            );
        }if (filters.practicals && day.getDay() === 5 && index === 0 && currentWeekNumber === 24) {
            const blockClass = 'practicals';
			
			cellContent = (
                <div className={`${blockClass} ${isCurrent ? 'current-interval' : ''}`}>
				<div className="type-label">{getTypeLabel(blockClass)}</div>
                    <div className="text-task">Элективные дисциплины по физической культуре и спорту</div>
                    <div className="text-place">
					<img src={locations} alt="locations" className="locations" style={{ fill: '#ece9f2' }} />
                    Спорт зал
                    </div>
                    <div className="text-time">
					<img src={time} alt="time" className="time" style={{ fill: '#ece9f2' }}/>
					{timeRange}
					</div>
                </div>
            );
        } if (filters.practicals && day.getDay() === 5 && index === 1 && currentWeekNumber === 24) {
            const blockClass = 'lectures';
			
			cellContent = (
             <div className={`${blockClass} ${isCurrent ? 'current-interval' : ''}`}>
			 <div className="type-label">{getTypeLabel(blockClass)}</div>
                    <div className="text-task">Направляющие системы электросвязи</div>
                    <div className="text-place">
					<img src={locations} alt="locations" className="locations" style={{ fill: '#ece9f2' }} />
                    VIII римская
                    </div>
                    <div className="text-time">
					<img src={time} alt="time" className="time" style={{ fill: '#ece9f2' }}/>
					{timeRange}
					</div>
                </div>
            );
        } if (filters.practicals && day.getDay() === 5 && index === 2 && currentWeekNumber === 24) {
           const blockClass = 'lectures';

		   cellContent = (
                    <div className={`${blockClass} ${isCurrent ? 'current-interval' : ''}`}>
					<div className="type-label">{getTypeLabel(blockClass)}</div>
                    <div className="text-task">Безопасность жизнедеятельности</div>
                    <div className="text-place">
					<img src={locations} alt="locations" className="locations" style={{ fill: '#ece9f2' }} />
                    I римская
                    </div>
                    <div className="text-time">
					<img src={time} alt="time" className="time" style={{ fill: '#ece9f2' }}/>
					{timeRange}
					</div>
                </div>
            );
        } if (filters.practicals && day.getDay() === 5 && index === 3 && currentWeekNumber === 24) {
            const blockClass = 'practicals';    
			
			cellContent = (
                    <div className={`${blockClass} ${isCurrent ? 'current-interval' : ''}`}>
					<div className="type-label">{getTypeLabel(blockClass)}</div>
                    <div className="text-task">Безопасность жизнедеятельности</div>
                    <div className="text-place">
					<img src={locations} alt="locations" className="locations" style={{ fill: '#ece9f2' }} />
                    213 УК 1
                    </div>
                    <div className="text-time">
					<img src={time} alt="time" className="time" style={{ fill: '#ece9f2' }}/>
					{timeRange}
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

>>>>>>> a50c08b8d2f661a4de6eac9d7e76c25b437752af
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
            {renderWeek(lessons, currentWeekNumber)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calendar;