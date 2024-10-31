import React from 'react';
import './ProfessorsList.css';
const ProfessorsList = () => {
  const professors = [
    { discipline: 'Многоканальные телекоммуникационные системы', name: '', email: '' },
    { discipline: 'Физические основы радиосвязи', name: '', email: '' },
    { discipline: 'Сети связи и системы коммутации', name: '', email: '' },
    { discipline: 'Элективные дисциплины по физической культуре и спорту', name: '', email: '' },
    { discipline: 'Направляющие системы электросвязи', name: '', email: '' },
    { discipline: 'Обработка экспериментальных данных', name: '', email: '' },
    { discipline: 'Безопасность жизнедеятельности', name: '', email: '' },
    { discipline: 'Компьютерное моделирование', name: '', email: '' },
    { discipline: 'Перспективные технологии в отрасли инфокоммуникаций', name: '', email: '' },
    { discipline: 'Оптоэлектроника и нанофотоника', name: '', email: '' },
  ];

  return (
    <div className="professors-container">
      <table className="professors-table">
        <thead>
          <tr>
            <th>Дисциплина</th>
            <th>ФИО преподавателя, знать надо!</th>
            <th>Почта (при наличии)</th>
          </tr>
        </thead>
        <tbody>
          {professors.map((professor, index) => (
            <tr key={index}>
              <td>{professor.discipline}</td>
              <td>{professor.name}</td>
              <td>{professor.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfessorsList;
