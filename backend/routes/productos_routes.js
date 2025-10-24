import { Router } from 'express';
import controller from '../controllers/productos_controller.js';

const router = Router();

router.get('/', controller.listar);

export default router;