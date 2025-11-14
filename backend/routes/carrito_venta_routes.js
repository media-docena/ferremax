import { Router } from "express";
import Controller from '../controllers/carrito_venta_controller.js';
import { validarProductoFiltro } from '../middlewares/productos_validations.js';
import { validarVenta } from '../middlewares/carrito_venta_validations.js';

const router = Router();

// Rutas
//router.get('/productos', RolesAutorizados, Controller.getProductosDisponibles);

router.get('/', validarProductoFiltro, Controller.getProductosDisponibles);

router.post('/', validarVenta, Controller.createVenta );

router.get('/:id', Controller.getVentaById);

export default router;