// app.js 
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import { notFoundHandler, errorHandler } from './utils/ApiError.js';

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
app.use(notFoundHandler);

// Error handler general
app.use(errorHandler);

export default app;
