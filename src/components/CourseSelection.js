import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CourseSelection.css';

const CourseSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="course-container">
      <h2 className="course-header">Выберите свой курс</h2>
      <button className="course-button" onClick={() => navigate('/group-selection')}>
        Первый курс
      </button>
	  <button className="course-button" onClick={() => navigate('/group-selection')}>
        Второй курс
      </button>
	  <button className="course-button" onClick={() => navigate('/group-selection')}>
        Третий курс
      </button>
	  <button className="course-button" onClick={() => navigate('/group-selection')}>
        Четвертый курс
      </button>
    </div>
  );
};

export default CourseSelection;
