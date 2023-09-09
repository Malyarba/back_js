const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const { error500 } = require('../decorators/error500validate');

// TO DO: 
// 1. Добавить ограничения по пустой строке
// 2. Добавить ограничения по строке из пробелов
// 4. Добавить регулярку для username по наличию спец. символов
// 5. Добавить регулярку для email`a 
// 6. Добавить ограничения для email`a 


// Middleware для разбора JSON
router.use(express.json());

// Middleware для проверки наличия обязательных ключей
function checkRequiredKeys(req, res, next) {
  const requiredKeys = ['username', 'email', 'password'];
  const missingKeys = requiredKeys.filter(key => !(key in req.body));
  if (missingKeys.length > 0) {
    return res.status(400).json({ message: `Отсутствует ключ: ${missingKeys.join(', ')}` });
  }
  next();
}

// Middleware для проверки уникальности email'а
async function checkUniqueEmail(req, res, next) {
  const { email } = req.body;
  try {
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error500 });
  }
}

// Middleware для проверки длины пароля и имени
function checkPasswordAndUsernameLength(req, res, next) {
  const { username, password } = req.body;
  if (password.length < 8 || password.length > 40) {
    return res.status(400).json({ message: 'Пароль должен содержать от 8 до 40 символов' });
  }
  if (username.length < 1 || username.length > 40) {
    return res.status(400).json({ message: 'Имя должно содержать от 1 до 40 символов' });
  }
  next();
}

// Middleware для хеширования пароля и сохранения в базе данных
async function hashPasswordAndSaveUser(req, res) {
  const { username, email, password } = req.body;
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, hashedPassword]);
    const userResponse = {
      id: newUser.rows[0].id,
      username: newUser.rows[0].username,
      email: newUser.rows[0].email,
    };
    res.status(201).json({ message: 'Пользователь успешно зарегистрирован', user: userResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error500 });
  }
}

// Объединение всех мидлваров
router.post('/register', checkRequiredKeys, checkUniqueEmail, checkPasswordAndUsernameLength, hashPasswordAndSaveUser);

module.exports = router;
