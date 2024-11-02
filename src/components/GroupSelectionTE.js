import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GroupSelection.css';
import arrowRightWeek from './arrow_right_week.png';
import arrowback from './backarrow.png';


const GroupSelectionTE3 = () => {
  const navigate = useNavigate();

  return (
    <div className="group-container">
	<div className="arrow-container">
	<button className="back-button" onClick={() => window.history.back()}>
        <img src={arrowback} alt="Back" className="back-arrow" />
    </button>
	</div>
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

export default GroupSelectionTE3;
