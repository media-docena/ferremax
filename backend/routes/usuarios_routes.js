import { Router } from 'express';
import controller from '../controllers/usuarios_controller.js';
import {
  validarUsuarioId,
  validarUsuarioEstado,
  validarUsuarioCrear,
  validarUsuarioEditar,
} from '../middlewares/usuarios_validations.js';
import { authorizeRole } from '../middlewares/auth_middlewares.js'

const router = Router();

// Middleware para autorizar acceso a rutas de usuarios
const soloAdmin = authorizeRole('admin');


/* GET listado de usuarios. */
router.get('/', soloAdmin, controller.listar);

/* POST crea un nuevo usuario */
router.post('/', soloAdmin, validarUsuarioCrear, controller.crear);

/* GET usuario por ID */
router.get('/:id', soloAdmin, validarUsuarioId, controller.obtenerPorId);

/* PUT usuario por ID */
router.put('/:id', soloAdmin, validarUsuarioEditar, controller.actualizar);

/* PATCH (actualiza estado) usuario por ID */
router.patch('/:id/estado', soloAdmin, validarUsuarioEstado, controller.cambiarEstado);

export default router;
