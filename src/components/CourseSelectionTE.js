import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CourseSelection.css';

const CourseSelectionTE = () => {
  const navigate = useNavigate();

  return (
    <div className="course-container">
      <h2 className="course-header">Выбери свой курс</h2>
      <button className="course-button" onClick={() => navigate('/group-selectionte1')}>
        Первый курс
      </button>
	  <button className="course-button" onClick={() => navigate('/group-selectionte2')}>
        Второй курс
      </button>
	  <button className="course-button" onClick={() => navigate('/group-selectionte3')}>
        Третий курс
      </button>
	  <button className="course-button" onClick={() => navigate('/group-selectionte4')}>
        Четвертый курс
      </button>
    </div>
  );
};

export default CourseSelectionTE;
