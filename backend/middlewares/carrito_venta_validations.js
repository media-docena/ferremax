import { body } from 'express-validator';
import { validateRequest, validateInt } from './utils.js';

export const validarVenta = [

    // ID del empleado debe ser un INT positivo
    validateInt('idEmpleado', 1)(),

    // Productos debe ser un array con al menos un elemento
    body('productos')
        .isArray({ min: 1 })
        .withMessage('Debe incluir al menos un producto'),

    // ID de cada producto debe ser un INT positivo
    body('productos.*.idProducto')
        .isInt({ min: 1 })
        .withMessage('Cada producto debe tener un ID válido'),

    // Cantidad de cada producto debe ser un INT positivo
    body('productos.*.cantidad')
        .isInt({ min: 1 })
        .withMessage('La cantidad de cada producto debe ser mayor a 0'),

    // Precio debe ser un decimal positivo
    body('productos.*.precio')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('El precio debe ser un número positivo'),

    validateRequest
];