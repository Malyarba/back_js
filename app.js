const express = require('express');
const bodyParser = require('body-parser');
const registerRoutes = require('./src/registration/registerController'); 
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger-config'); // Путь к файлу конфигурации swagger
const app = express();


app.use(bodyParser.json()); // Парсинг данных из тела запроса
app.use(registerRoutes); // Используйте маршруты из модуля registerRoutes

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
