import React, { useState } from 'react';
import { isWithinInterval } from 'date-fns';
import './TE21B.css';

const Otladka = () => {
  const [filters, setFilters] = useState({
    lectures: true,
  });

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
      const currentDay = day.getDay();
      const isCurrent = isWithinInterval(new Date(), {
        start: new Date(day.getFullYear(), day.getMonth(), day.getDate(), parseInt(interval.start.split(":")[0]), parseInt(interval.start.split(":")[1])),
        end: new Date(day.getFullYear(), day.getMonth(), day.getDate(), parseInt(interval.end.split(":")[0]), parseInt(interval.end.split(":")[1]))
      });

      return (
        <tr key={index}>
          <td className="date-cell">
            <div className="mobile-schedule-item">
              <div className="time-label">
              </div>
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
            </div>
          </td>
        </tr>
      );
    });
  };

  const currentDay = new Date();

  return (
    <div className="mobile-day-schedule">
      <h2>{currentDay.toLocaleDateString('ru-RU', { weekday: 'long' })}</h2>
      <table>
        <tbody>
          {renderMobileDaySchedule(currentDay)}
        </tbody>
      </table>
    </div>
  );
};

export default Otladka;
