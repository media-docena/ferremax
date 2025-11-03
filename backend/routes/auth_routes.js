import { Router } from 'express';
import controller from '../controllers/auth_controller.js'
import { validarAuthLogin } from '../middlewares/auth_validations.js';

const router = Router();

router.post('/login', validarAuthLogin, controller.login);


export default router;