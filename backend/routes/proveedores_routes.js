import { Router } from 'express';
import controller from '../controllers/proveedores_controller.js'

const router = Router();

// GET lista de proveedores
router.get('/', controller.listar);

export default router;