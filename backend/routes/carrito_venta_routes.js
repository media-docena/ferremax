import { Router } from "express";
import Controller from '../controllers/carrito_venta_controller.js';
import { validarProductoFiltro } from '../middlewares/productos_validations.js';
import { validarVenta } from '../middlewares/carrito_venta_validations.js';
import { authorizeRole } from '../middlewares/auth_middlewares.js';

const router = Router();

// Middleware que autoriza roles
const RolesAutorizados = authorizeRole('encargado', 'vendedor');

// Rutas
//router.get('/productos', RolesAutorizados, Controller.getProductosDisponibles);

router.get('/', validarProductoFiltro, Controller.getProductosDisponibles);

router.post('/', RolesAutorizados, validarVenta, Controller.createVenta );

router.get('/:id', RolesAutorizados, Controller.getVentaById);

export default router;