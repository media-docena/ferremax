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
import swaggerUI from 'swagger-ui-express';
import { swaggerOptions } from '../swagger/swagger.js';
import swaggerDoc from '../swagger/openapi.json' with { type: 'json' };
import carritoVentaRouter from './carrito_venta_routes.js';

const v1Router = Router();

// Todas las rutas v1 (versión 1) se encuentran acá

// Rutas públicas
v1Router.use('/', indexRouter);
v1Router.use('/auth', authRouter);

// Documentación de Swagger
v1Router.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc, swaggerOptions))

// Ruta de swagger para renderizar desde el frontend
v1Router.get('/documentacion', (req, res) => res.json(swaggerDoc));

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
v1Router.use('/carritoventa', carritoVentaRouter);

export default v1Router;
