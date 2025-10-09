// app.js 
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import v1Router from './routes/v1.js';


const app = express();

// Middlewares
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Rutas API para la versión 1
app.use('/api/v1', v1Router);

// Middleware para rutas no encontradas (404)
// eslint-disable-next-line no-unused-vars
app.use((req, res, next) => {
  res.status(404).json({
    status: 404,
    error: 'Not Found',
    message: `Recurso no encontrado: ${req.method} ${req.originalUrl}`,
    path: req.originalUrl,
  });
});

// Error handler general
// eslint-disable-next-line no-unused-vars 
app.use((err, req, res, next) => {
  console.error('Error:', err);

  const status = err.status || err.statusCode || 500;

  res.status(status).json({
    status: status,
    error: err.name || 'Error',
    message: err.message || 'Ha ocurrido un error en el servidor',
    // En producción, no mostrar el stack trace
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

export default app;
