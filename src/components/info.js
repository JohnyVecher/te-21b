import React from 'react';
import './info.css';

const info = () => {
  return (
    <div className="info-page">
      <h1>ТУТ ПРО ЦВЕТА</h1>
      <p>Пишу для всяких <strong>Максов</strong>.</p>
      <p>
        <span className="lab">Фиолетовый</span> — это лабораторная работа,
        <span className="practice">Оранжевый</span> — это практическая работа,
        <span className="lecture">Красный</span> — это лекция.
      </p>
    </div>
  );
};

export default info;
