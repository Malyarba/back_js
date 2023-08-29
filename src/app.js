const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/register'); // Импортируйте модуль register.js
const app = express();

// Парсинг данных из тела запроса
app.use(bodyParser.json());

// Используйте маршруты из модуля authRoutes
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
