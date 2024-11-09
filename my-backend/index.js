const express = require('express');
const { Pool } = require('pg');  // Подключение к PostgreSQL

const app = express();
const port = process.env.PORT || 3000;

// Настройки подключения к PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Убедитесь, что этот URL настроен в переменных окружения на Vercel
  ssl: { rejectUnauthorized: false }
});

app.get('/api/classes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM schedule');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Ошибка сервера');
  }
});

app.listen(port, () => {
  console.log(`Сервер работает на порту ${port}`);
});

module.exports = app; // Экспортируем приложение для Vercel
