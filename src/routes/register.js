const express = require('express');
const router = express.Router();
const pool = require('../db'); // Импорт подключения к базе данных

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Проверка уникальности email'а
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
    }

    // Здесь вы можете добавить код для хеширования пароля
    // и сохранения данных пользователя в базе данных

    res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка регистрации пользователя' });
  }
});

module.exports = router;
