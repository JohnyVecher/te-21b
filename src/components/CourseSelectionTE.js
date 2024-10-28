import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CourseSelection.css';
import arrowRightWeek from './arrow_right_week.png';

const CourseSelectionTE = () => {
  const navigate = useNavigate();

  return (
    <div className="course-container">
      <h2 className="course-header">Выбери свой курс</h2>
      <button className="course-button" onClick={() => navigate('/group-selectionte1')}>
        Первый курс
		<img src={arrowRightWeek} alt="Arrow" className="arrow-icon" />
      </button>
	  <button className="course-button" onClick={() => navigate('/group-selectionte2')}>
        Второй курс
		<img src={arrowRightWeek} alt="Arrow" className="arrow-icon" />
      </button>
	  <button className="course-button" onClick={() => navigate('/group-selectionte3')}>
        Третий курс
		<img src={arrowRightWeek} alt="Arrow" className="arrow-icon" />
      </button>
	  <button className="course-button" onClick={() => navigate('/group-selectionte4')}>
        Четвертый курс
		<img src={arrowRightWeek} alt="Arrow" className="arrow-icon" />
      </button>
    </div>
  );
};

export default CourseSelectionTE;
