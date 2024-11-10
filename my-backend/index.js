const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');  // Подключение CORS для обработки запросов с разных доменов

const app = express();
const port = process.env.PORT || 3000;

// Включаем CORS
app.use(cors());

// Настройки подключения к PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Эндпоинт для получения расписания занятий
app.get('/api/classes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM schedule');
    res.json(result.rows);
  } catch (error) {
    console.error('Ошибка при запросе к базе данных:', error);
    res.status(500).send('Ошибка сервера');
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер работает на порту ${port}`);
});

module.exports = app; // Экспорт приложения для Vercel
