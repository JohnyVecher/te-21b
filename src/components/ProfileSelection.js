// Пример для ProfileSelection.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileSelection.css';
import arrowRightWeek from './arrow_right_week.png';

const ProfileSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="profile-container">
      <h2 className="profile-header">Выбери свой профиль</h2>
      <h2 className="level">Высшее образование</h2>
      <button className="profile-button" onClick={() => navigate('/course-selectionte')}>
        Транспортные сети и системы связи
        <img src={arrowRightWeek} alt="Arrow" className="arrow-icon" />
      </button>
      <button className="profile-button" onClick={() => navigate('/course-selectionite')}>
        Информационные технологии в услугах связи
        <img src={arrowRightWeek} alt="Arrow" className="arrow-icon" />
      </button>
    </div>
  );
};

export default ProfileSelection;
