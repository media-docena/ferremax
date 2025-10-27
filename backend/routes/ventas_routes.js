import { Router } from 'express';
import controller from '../controllers/ventas_controller.js';
import { validarVentaFiltro } from '../middlewares/ventas_validations.js';

const router = Router();

router.get('/', validarVentaFiltro, controller.listar);

export default router;