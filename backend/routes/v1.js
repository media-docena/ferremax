import { Router } from 'express';
import indexRouter from './index.js';
import usuariosRouter from './usuarios_routes.js';
import productosRouter from './productos_routes.js';

const v1Router = Router();

// Todas las rutas v1 se encuentran acá
v1Router.use('/', indexRouter);
v1Router.use('/usuarios', usuariosRouter);
v1Router.use('/productos', productosRouter);

export default v1Router;
