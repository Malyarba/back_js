const express = require('express');
const bodyParser = require('body-parser');
const registerRoutes = require('./register/register'); // Используйте относительный путь до файла register.js
const app = express();

// Парсинг данных из тела запроса
app.use(bodyParser.json());

// Используйте маршруты из модуля registerRoutes
app.use(registerRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
