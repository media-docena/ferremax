import { Router } from 'express';
import controller from '../controllers/productos_controller.js';
import { validarProductoFiltro, validarProductoId } from '../middlewares/productos_validations.js';

const router = Router();

router.get('/', validarProductoFiltro, controller.listar);

router.get('/:id',validarProductoId, controller.obtenerPorId);

export default router;