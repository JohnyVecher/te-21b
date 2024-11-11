import React from 'react';
import './info.css';

const info = () => {
  return (
  <div className="daunpage">
    <div className="info-page">
      <h1>Про приложение</h1>
      <h2>На данный момент приложение находится на стадии раннего бета-тестирования мобильной версии (пк в целом готово, на два фронта разорваться не могу). Идет работа над его улучшением, и поэтому вы можете столкнуться с небольшими недоработками. Чтобы получить наилучший опыт использования, рекомендую установить приложение на ваш смартфон как PWA. Это позволит вам открывать его как обычное приложение, без необходимости заходить на сайт через браузер. Так же учитывайте что расписание, которое выкладываю я может отличаться от текущего, так как я не всегда слежу за его изменениями, сверяйтесь с тем которое составляет ваш староста.</h2>
	  
	  <h1>Как установить PWA</h1>
	  <h3>На Android: откройте приложение в браузере, нажмите на значок меню (три точки) и выберите "Установить приложение". (либо аналогично ios) </h3>
      <h3>На iOS (Safari): нажмите на значок "Поделиться" и выберите "На экран 'Домой'".</h3>
	  <h2>Если вы обнаружили ошибку или хотите поделиться идеями по улучшению, писать сюда - soez52@rambler.ru</h2>
    </div>
	</div>
  );
};

export default info;
