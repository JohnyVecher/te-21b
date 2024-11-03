import React from 'react';
import './Portfolio.css';

const PortfoliosList = () => {
  const portfolios = [
    { discipline: 'Многоканальные телекоммуникационные системы', name: 'MЭС', email: 'https://docs.google.com/spreadsheets/d/1bQIJequKaj0Od3ELZpSzbOoRD2_HZKoB9izY1NQTm4U/edit#gid=28697151' },
    { discipline: 'Физические основы радиосвязи', name: '', email: '' },
    { discipline: 'Сети связи и системы коммутации', name: 'MЭС', email: 'https://docs.google.com/spreadsheets/d/1bQIJequKaj0Od3ELZpSzbOoRD2_HZKoB9izY1NQTm4U/edit#gid=28697151' },
    { discipline: 'Элективные дисциплины по физической культуре и спорту', name: 'на кафедре физры как не странно', email: '' },
    { discipline: 'Направляющие системы электросвязи', name: 'MЭС', email: 'https://docs.google.com/spreadsheets/d/1bQIJequKaj0Od3ELZpSzbOoRD2_HZKoB9izY1NQTm4U/edit#gid=28697151' },
    { discipline: 'Обработка экспериментальных данных', name: '', email: '' },
    { discipline: 'Безопасность жизнедеятельности', name: '', email: '' },
    { discipline: 'Компьютерное моделирование', name: 'MЭС', email: 'https://docs.google.com/spreadsheets/d/1bQIJequKaj0Od3ELZpSzbOoRD2_HZKoB9izY1NQTm4U/edit#gid=28697151' },
    { discipline: 'Перспективные технологии в отрасли инфокоммуникаций', name: 'ИТИМС', email: 'https://docs.google.com/spreadsheets/d/19fM55yB0fwvguEwH60H3SMcrrPytq47SLuyob3qqVpg/edit#gid=1217056741' },
    { discipline: 'Оптоэлектроника и нанофотоника', name: '', email: '' },
  ];

  return (
    <div className="portfolios-container">
      <table className="portfolios-table">
        <thead>
          <tr>
            <th>Дисциплина</th>
            <th>Кафедра</th>
            <th>Таблица портфолио</th>
          </tr>
        </thead>
        <tbody>
          {portfolios.map((portfolio, index) => (
            <tr key={index}>
              <td>{portfolio.discipline}</td>
              <td>{portfolio.name}</td>
              <td>
                {portfolio.email ? (
                  <a href={portfolio.email} target="_blank" rel="noopener noreferrer">
                    Портфолио
                  </a>
                ) : (
                  portfolio.email // Если email - это номер телефона или пустое поле
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PortfoliosList;
