import { Router } from 'express';
import controller from '../controllers/ventas_controller.js';
import { validarVentaFiltro, validarTopProductosFiltro } from '../middlewares/ventas_validations.js';
import { authorizeRole } from '../middlewares/auth_middlewares.js';

const router = Router();

// Middleware para autorizar acceso a rutas de usuarios
const soloAdminEncargado = authorizeRole('admin', 'encargado');


router.get('/',soloAdminEncargado, validarVentaFiltro, controller.listar);

router.get('/stats/top-productos', soloAdminEncargado, validarTopProductosFiltro, controller.obtenerTopProductos);

export default router;