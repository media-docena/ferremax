import { Router } from 'express';
import indexRouter from './index.js';
import authRouter from './auth_routes.js'
import usuariosRouter from './usuarios_routes.js';
import productosRouter from './productos_routes.js';
import ventasRouter from './ventas_routes.js';
import { verifyToken } from '../middlewares/auth_middlewares.js';

const v1Router = Router();

// Todas las rutas v1 (versión 1) se encuentran acá

// Rutas públicas
v1Router.use('/', indexRouter);
v1Router.use('/auth', authRouter);

// Middleware de validación de token
v1Router.use(verifyToken);

// Rutas protegidas (requieren token)
v1Router.use('/usuarios', usuariosRouter);
v1Router.use('/productos', productosRouter);
v1Router.use('/ventas', ventasRouter);

export default v1Router;
