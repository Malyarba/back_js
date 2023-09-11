const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0', // версия OpenAPI Specification
    info: {
      title: 'Food_recipes_api',
      version: '1.0.0',
      description: 'description_of_api',
    },
  },
  // Указываем пути к маршрутам, которые вы хотите включить в документацию
  apis: ['./src/registration/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
