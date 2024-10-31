import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GroupSelection.css';

const GroupSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="group-container">
      <h2 className="group-header">Выберите группу</h2>
      <button className="group-button" onClick={() => navigate('/TE21B')}>
        ТЕ-21Б
      </button>
      <button className="group-button" onClick={() => navigate('/TE21B')}>
        ТЕ-22Б
      </button>
    </div>
  );
};

export default GroupSelection;
