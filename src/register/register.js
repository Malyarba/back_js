const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Проверка уникальности email'а
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
    }

    // Проверка длины пароля
    if (password.length < 8) {
      return res.status(400).json({ message: 'Пароль должен содержать минимум 8 символов' });
    }

    if (password.length > 40) {
      return res.status(400).json({ message: 'Пароль должен содержать максиум 40 символов' });
    }

    // Хеширование пароля
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Сохранение данных пользователя в базе данных
    const newUser = await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, hashedPassword]);

    // Отправляем только необходимые данные в ответе, без хешированного пароля
    const userResponse = {
      id: newUser.rows[0].id,
      username: newUser.rows[0].username,
      email: newUser.rows[0].email,
    };

    res.status(201).json({ message: 'Пользователь успешно зарегистрирован', user: userResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка регистрации пользователя - попробуйте обновить приложение и напиши в техподдержку N' });
  }
});

module.exports = router;