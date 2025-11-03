import { Router } from 'express';
import indexRouter from './index.js';
import authRouter from './auth_routes.js'
import usuariosRouter from './usuarios_routes.js';
import productosRouter from './productos_routes.js';
import ventasRouter from './ventas_routes.js';
import proveedoresRouter from './proveedores_routes.js'
import categoriasRouter from './categorias_routes.js'
import marcasRouter from './marcas_routes.js'
import rolesRouter from './roles_routes.js'
import unidadesRouter from './unidades_routes.js'
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
v1Router.use('/proveedores', proveedoresRouter);
v1Router.use('/categorias', categoriasRouter);
v1Router.use('/marcas', marcasRouter);
v1Router.use('/roles', rolesRouter);
v1Router.use('/unidades', unidadesRouter);
export default v1Router;
