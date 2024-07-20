// corsConfig.js
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3000', // Reemplaza con la URL de tu front-end
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: 'Content-Type, Authorization',
};

module.exports = cors(corsOptions);
