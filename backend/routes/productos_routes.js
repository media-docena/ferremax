import { Router } from 'express';
import controller from '../controllers/productos_controller.js';
import {
  validarProductoFiltro,
  validarProductoId,
  validarProductoEstado,
  validarProductoCrear,
  validarProductoEditar,
} from '../middlewares/productos_validations.js';
import { authorizeRole } from '../middlewares/auth_middlewares.js';


const router = Router();

// Middleware para autorizar acceso a rutas de usuarios
const soloAdminEncargado = authorizeRole('admin', 'encargado');

router.get('/', validarProductoFiltro, controller.listar);

router.get('/:id', validarProductoId, controller.obtenerPorId);

router.post('/', soloAdminEncargado, validarProductoCrear, controller.crear);

router.put('/:id', soloAdminEncargado, validarProductoId, validarProductoEditar, controller.actualizar);

router.patch('/:id/estado', soloAdminEncargado, validarProductoEstado, controller.cambiarEstado);

export default router;
