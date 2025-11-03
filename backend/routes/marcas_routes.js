import { Router } from 'express';
import controller from '../controllers/marcas_controller.js'

const router = Router();

// GET lista de categorias
router.get('/', controller.listar);

export default router;