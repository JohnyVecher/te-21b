import React from 'react';
import './ProfessorsList.css';

const ProfessorsList = () => {
  const professors = [
    { discipline: 'Многоканальные телекоммуникационные системы', name: 'Шестаков Иван Игоревич', email: '' },
    { discipline: 'Физические основы радиосвязи', name: 'Корякова Ирина Павловна', email: '' },
    { discipline: 'Сети связи и системы коммутации', name: 'Гительман Мария Васильевна', email: 'тел: 89126511981' },
    { discipline: 'Элективные дисциплины по физической культуре и спорту', name: 'Чащихин Анатолий Владимирович', email: '' },
    { discipline: 'Направляющие системы электросвязи', name: 'Гниломёдов Ефим Иванович', email: '' },
    { discipline: 'Обработка экспериментальных данных', name: 'Корякова Ирина Павловна', email: '' },
    { discipline: 'Безопасность жизнедеятельности', name: 'Обухов Василий Алексеевич', email: '' },
    { discipline: 'Компьютерное моделирование', name: 'Кусакин Дмитрий Вячеславович', email: '' },
    { discipline: 'Перспективные технологии в отрасли инфокоммуникаций', name: 'Каменской Александр Евгеньевич', email: '' },
    { discipline: 'Оптоэлектроника и нанофотоника', name: 'Пилипенко Геннадий Иванович', email: '' },
  ];

  return (
    <div className="professors-container">
      <table className="professors-table">
        <thead>
          <tr>
            <th>Дисциплина</th>
            <th>ФИО преподавателя</th>
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
