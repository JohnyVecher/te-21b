import React from 'react';
import './InfoPage.css'; // Импортируйте стили для вашей страницы

const InfoPage = () => {
  return (
    <div className="info-page">
      <h1>Информационная страница</h1>
      <p>Пишу для всяких <strong>Максов</strong>.</p>
      <p>
        <span className="lab">Фиолетовый</span> — это лабораторная работа,
        <span className="practice"> синий</span> — это практическая работа,
        <span className="lecture"> циановый</span> — это лекция.
      </p>
    </div>
  );
};

export default InfoPage;
