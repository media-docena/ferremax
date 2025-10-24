import { Router } from 'express';
import controller from '../controllers/productos_controller.js';
import { validarProductoFiltro } from '../middlewares/productos_validations.js';

const router = Router();

router.get('/', validarProductoFiltro, controller.listar);

export default router;