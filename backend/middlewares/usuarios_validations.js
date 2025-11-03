import {
  validateId,
  requiredField,
  validateString,
  validateRequest,
  validateConstants,
  validatePassword,
  validatePhone,
  validateDNI,
} from './utils.js';
import { ESTADOS, ROLES } from '../utils/constants.js';
import { body } from 'express-validator'
/**
 * Validación para obtener un usuario por ID
 */

export const validarUsuarioId = [
  validateId('id', 'param', 'ID del usuario')(),
  validateRequest,
];

/**
 * Validación para cambiar el estado de un usuario
 * Valida el ID en la ruta y el estado en el body
 */
export const validarUsuarioEstado = [
  requiredField('id', 'param')(),

  validateId('id', 'param', 'ID del producto')(),

  requiredField('estado')(),

  validateString('estado', 20, true)().toLowerCase(),

  validateConstants('estado', ESTADOS)(),

  validateRequest,
];

export const validarUsuarioCrear = [
  // Datos del usuario
  requiredField('correo')(),
  body('correo')
  .isEmail()
  .withMessage('Debe ser un correo válido.')
  .normalizeEmail(),

  validatePassword('password')(),

  requiredField('idRol')(),
  validateConstants('idRol', ROLES)(),
  validateId('idRol','body', 'ID de rol')(),

  validateString('estado', 20, true)().toLowerCase(),
  validateConstants('estado', ESTADOS)(),

  // Datos del modelo empleado
  validateString('nombre', 50,true)(),
  validateString('apellido', 50, true)(),
  validateDNI('dni',true, 7,20, false)(),
  validateString('direccion', 100)(),
  validatePhone('telefono')(),

  validateRequest
];

export const validarUsuarioEditar = [
  // Datos del usuario
  requiredField('id', 'param')(),
  validateId('id', 'param', 'ID de usuario')(),
  
  body('correo')
    .optional({ values: 'falsy' })
    .isEmail()
    .withMessage('Debe ser un correo válido.')
    .normalizeEmail(),

  validatePassword('password', false)(),


  validateId('idRol', 'body', 'ID de rol')().optional(),
  validateConstants('idRol', ROLES)().optional(),

  validateString('estado', 20, false)().toLowerCase(),
  validateConstants('estado', ESTADOS)().optional(),

  // Datos del modelo empleado
  validateString('nombre', 50, false)(),
  validateString('apellido', 50, false)(),
  validateDNI('dni', false, 7, 20, false)(),
  validateString('direccion', 100, false)(),
  validatePhone('telefono', false)(),

  validateRequest,
];