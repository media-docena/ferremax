import { Router } from 'express';
import controller from '../controllers/usuarios_controller.js';
import { validarUsuarioId, validarUsuarioEstado, validarUsuarioCrear, validarUsuarioEditar } from '../middlewares/usuarios_validations.js';

const router = Router();

/* GET listado de usuarios. */
router.get('/', controller.listar);

/* POST crea un nuevo usuario */
router.post('/', validarUsuarioCrear, controller.crear);

/* GET usuario por ID */
router.get('/:id', validarUsuarioId, controller.obtenerPorId);

/* PUT usuario por ID */
router.put('/:id', validarUsuarioEditar, controller.actualizar);

/* PATCH (actualiza estado) usuario por ID */
router.patch('/:id/estado', validarUsuarioEstado, controller.cambiarEstado);

export default router;
