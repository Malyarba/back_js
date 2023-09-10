const express = require('express');
const bodyParser = require('body-parser');
const registerRoutes = require('./src/registration/register'); 
const app = express();


app.use(bodyParser.json()); // Парсинг данных из тела запроса
app.use(registerRoutes); // Используйте маршруты из модуля registerRoutes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
