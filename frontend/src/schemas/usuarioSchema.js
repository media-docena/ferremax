import { z } from 'zod';


export const createUsuarioSchema = z.object({
  nombre: z
    .string({
      required_error: 'El campo nombre del es requerido',
    })
    .min(2, 'El nombre es debe tener mínimo 2 caracteres')
    .max(50, 'El nombre debe tener máximo 50 caracteres')
    .trim(),

  apellido: z
    .string()
    .min(1, 'El apellido es requerido')
    .max(50, 'El apellido debe tener máximo 50 caracteres')
    .trim(),

  correo: z
    .string()
    .min(1, 'El correo es requerido')
    .email('Debe ser un correo válido')
    .toLowerCase()
    .trim(),

  password: z
    .string()
    .min(8, 'La contraseña debe tener mínimo 8 caracteres')
    .max(255, 'La contraseña debe tener máximo 255 caracteres'),

  dni: z
    .string()
    .min(7, 'El DNI debe tener mínimo 7 caracteres')
    .max(20, 'El DNI debe tener máximo 20 caracteres')
    .regex(/^[A-Z0-9]+$/i, 'El DNI solo puede contener letras y números')
    .trim(),

  idRol: z
    .string()
    .min(1, 'El rol es requerido')
    .refine((val) => ['1', '2', '3'].includes(val), {
      message: 'Rol inválido',
    }),

  // Campos opcionales
  telefono: z
    .string()
    .min(7, 'El teléfono debe tener mínimo 7 caracteres')
    .max(20, 'El teléfono debe tener máximo 20 caracteres')
    .regex(/^[0-9\s+()-]+$/, 'El teléfono tiene un formato inválido')
    .trim()
    .optional()
    .or(z.literal('')),

  direccion: z
    .string()
    .max(100, 'La dirección debe tener máximo 100 caracteres')
    .trim()
    .optional()
    .or(z.literal('')),

  estado: z
    .enum(['activo', 'inactivo'], {
      errorMap: () => ({ message: 'El estado debe ser activo o inactivo' }),
    })
    .default('activo'),
});



export const updateUsuarioSchema = z.object({
  nombre: z
    .string()
    .min(1, 'El nombre no puede estar vacío')
    .max(50, 'El nombre debe tener máximo 50 caracteres')
    .trim()
    .optional()
    .or(z.literal('')),

  apellido: z
    .string()
    .min(1, 'El apellido no puede estar vacío')
    .max(50, 'El apellido debe tener máximo 50 caracteres')
    .trim()
    .optional()
    .or(z.literal('')),

  correo: z
    .string()
    .email('Debe ser un correo válido')
    .toLowerCase()
    .trim()
    .optional()
    .or(z.literal('')),

  password: z
    .string()
    .min(8, 'La contraseña debe tener mínimo 8 caracteres')
    .max(255, 'La contraseña debe tener máximo 255 caracteres')
    .optional()
    .or(z.literal('')),

  dni: z
    .string()
    .min(7, 'El DNI debe tener mínimo 7 caracteres')
    .max(20, 'El DNI debe tener máximo 20 caracteres')
    .regex(/^[A-Z0-9]+$/i, 'El DNI solo puede contener letras y números')
    .trim()
    .optional()
    .or(z.literal('')),

  idRol: z
    .string()
    .refine((val) => ['1', '2', '3'].includes(val), {
      message: 'Rol inválido',
    })
    .optional()
    .or(z.literal('')),

  telefono: z
    .string()
    .min(7, 'El teléfono debe tener mínimo 7 caracteres')
    .max(20, 'El teléfono debe tener máximo 20 caracteres')
    .regex(/^[0-9\s+()-]+$/, 'El teléfono tiene un formato inválido')
    .trim()
    .optional()
    .or(z.literal('')),

  direccion: z
    .string()
    .max(100, 'La dirección debe tener máximo 100 caracteres')
    .trim()
    .optional()
    .or(z.literal('')),

  estado: z
    .enum(['activo', 'inactivo'], {
      errorMap: () => ({ message: 'El estado debe ser activo o inactivo' }),
    })
    .optional()
    .or(z.literal('')),
});
