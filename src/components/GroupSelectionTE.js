import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GroupSelection.css';
import arrowRightWeek from './arrow_right_week.png';

const GroupSelectionTE = () => {
  const navigate = useNavigate();

  return (
    <div className="group-container">
      <h2 className="group-header">Выбери свою группу</h2>
      <button className="group-button" onClick={() => navigate('/TE21B')}>
        ТЕ-21Б
		<img src={arrowRightWeek} alt="Arrow" className="arrow-icon" />
      </button>
      <button className="group-button" onClick={() => navigate('/TE22B')}>
        ТЕ-22Б
		<img src={arrowRightWeek} alt="Arrow" className="arrow-icon" />
      </button>
    </div>
  );
};

export default GroupSelectionTE;
