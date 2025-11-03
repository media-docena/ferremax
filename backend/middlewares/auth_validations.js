import { body } from 'express-validator';
import { requiredField, validatePassword, validateRequest } from './utils.js';

export const validarAuthLogin = [
  requiredField('correo')(),
  body('correo')
    .isEmail()
    .withMessage('Debe ser un correo válido.')
    .normalizeEmail(),

  validatePassword('password')(),

  validateRequest,
];
