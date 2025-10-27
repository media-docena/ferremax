import { Router } from 'express';
import controller from '../controllers/ventas_controller.js';
import { validarVentaFiltro, validarTopProductosFiltro } from '../middlewares/ventas_validations.js';

const router = Router();

router.get('/', validarVentaFiltro, controller.listar);

router.get('/stats/top-productos', validarTopProductosFiltro, controller.obtenerTopProductos);

export default router;