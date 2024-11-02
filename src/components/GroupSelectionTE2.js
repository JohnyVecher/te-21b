import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GroupSelection.css';
import arrowRightWeek from './arrow_right_week.png';
import arrowback from './backarrow.png';


const GroupSelectionTE = () => {
  const navigate = useNavigate();

  return (
    <div className="group-container">
	<div className="arrow-container">
	<button className="back-button" onClick={() => window.history.back()}>
        <img src={arrowback} alt="Back" className="back-arrow" />
    </button>
	</div>
      <h2 className="group-header">Выбери свою группу</h2>
      <button className="group-button" onClick={() => navigate('/TE31B')}>
        ТЕ-31Б
		<img src={arrowRightWeek} alt="Arrow" className="arrow-icon" />
      </button>
      <button className="group-button" onClick={() => navigate('/TE32B')}>
        ТЕ-32Б
		<img src={arrowRightWeek} alt="Arrow" className="arrow-icon" />
      </button>
    </div>
  );
};

export default GroupSelectionTE;
