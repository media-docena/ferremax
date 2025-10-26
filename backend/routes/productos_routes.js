import { Router } from 'express';
import controller from '../controllers/productos_controller.js';
import {
  validarProductoFiltro,
  validarProductoId,
  validarProductoEstado,
  validarProductoCrear,
  validarProductoEditar,
} from '../middlewares/productos_validations.js';


const router = Router();

router.get('/', validarProductoFiltro, controller.listar);

router.get('/:id', validarProductoId, controller.obtenerPorId);

router.post('/', validarProductoCrear, controller.crear);

router.put('/:id', validarProductoId, validarProductoEditar, controller.actualizar);

router.patch('/:id/estado', validarProductoEstado, controller.cambiarEstado);

export default router;
