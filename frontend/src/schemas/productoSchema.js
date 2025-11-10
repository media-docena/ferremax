import { z } from 'zod';
import { fechaFutura30Dias } from '../helpers/productsHelper';

// Schema de validación de los datos de un producto
export const createProductoSchema = z.object({
  codigo: z
    .string({
      required_error: 'El código del producto es requerido',
    })
    .trim()
    .min(3, { message: 'El código debe tener al menos 3 caracteres' })
    .max(50, { message: 'El código no puede superar los 50 caracteres' })
    .transform(
      (val) =>
        val
          .toUpperCase()
          .replace(/\s+/g, '-') // Espacios a guiones
          .replace(/[^A-Z0-9-]/g, '') // Solo permite letras, números y guiones
    )
    .refine((val) => /^[A-Z0-9-]+$/.test(val), {
      message: 'El código solo puede contener letras, números y guiones',
    }),

  nombre: z
    .string({
      required_error: 'El nombre del producto es requerido',
    })
    .trim()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede exceder los 100 caracteres'),

  descripcion: z
    .string()
    .trim()
    .max(255, 'La descripción no puede exceder los 255 caracteres')
    .optional()
    .or(z.literal('')),

  precio: z
    .string()
    .min(0.01, 'El precio es requerido')
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), { message: 'El precio debe ser un número' })
    .refine((val) => val >= 0.01, {
      message: 'El precio debe ser mayor o igual a 0.01',
    })
    .refine((val) => val <= 10000000, {
      message: 'El precio no puede superar los 10.000.000',
    }),

  stock: z
    .string()
    .optional()
    .refine((val) => !val || (!isNaN(parseInt(val)) && parseInt(val) >= 0), {
      message: 'El stock debe ser un número mayor a 0',
    }),

  stockMin: z
    .string()
    .optional()
    .refine((val) => !val || (!isNaN(parseInt(val)) && parseInt(val) >= 5), {
      message: 'El stock mínimo debe ser un número mayor o igual a 5',
    }),

  fechaVencimiento: z
    .string()
    .optional()
    .refine((val) => !val || fechaFutura30Dias(val), {
      message: 'La fecha de vencimiento debe ser mayor a 30 dias',
    }),

  idCategoria: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(parseInt(val)), {
      message: 'ID de categoría inválido',
    }),

  idMarca: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(parseInt(val)), {
      message: 'ID de marca inválido',
    }),

  idUnidad: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(parseInt(val)), {
      message: 'ID de unidad inválido',
    }),

  idProveedor: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(parseInt(val)), {
      message: 'ID de proveedor inválido',
    }),
});


export const updateProductoSchema = z.object({
  codigo: z
    .string()
    .trim()
    .min(3, { message: 'El código debe tener al menos 3 caracteres' })
    .max(50, { message: 'El código no puede superar los 50 caracteres' })
    .transform(
      (val) =>
        val
          .toUpperCase()
          .replace(/\s+/g, '-') // Espacios a guiones
          .replace(/[^A-Z0-9-]/g, '') // Solo permite letras, números y guiones
    )
    .refine((val) => /^[A-Z0-9-]+$/.test(val), {
      message: 'El código solo puede contener letras, números y guiones',
    })
    .optional()
    .or(z.literal('')),

  nombre: z
    .string()
    .trim()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede exceder los 100 caracteres')
    .optional()
    .or(z.literal('')),

  descripcion: z
    .string()
    .trim()
    .max(255, 'La descripción no puede exceder los 255 caracteres')
    .optional()
    .or(z.literal('')),

  precio: z
    .string()
    .min(0.01, 'El precio es requerido')
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), { message: 'El precio debe ser un número' })
    .refine((val) => val >= 0.01, { message: 'El precio debe ser mayor o igual a 0.01' })
    .refine((val) => val <= 10000000, {
      message: 'El precio no puede superar los 10.000.000',
    }),

  stock: z
    .string()
    .optional()
    .refine((val) => !val || (!isNaN(parseInt(val)) && parseInt(val) >= 0), {
      message: 'El stock debe ser un número mayor o igual a 0',
    }),

  stockMin: z
    .string()
    .optional()
    .refine((val) => !val || (!isNaN(parseInt(val)) && parseInt(val) >= 5), {
      message: 'El stock mínimo debe ser un número mayor o igual a 5',
    }),

  fechaVencimiento: z
    .string()
    .optional()
    .refine((val) => !val || fechaFutura30Dias(val), {
      message: 'La fecha de vencimiento debe ser al mayor a 30 dias',
    }),

  idCategoria: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(parseInt(val)), {
      message: 'ID de categoría inválido',
    }),

  idMarca: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(parseInt(val)), {
      message: 'ID de marca inválido',
    }),

  idUnidad: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(parseInt(val)), {
      message: 'ID de unidad inválido',
    }),

  idProveedor: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(parseInt(val)), {
      message: 'ID de proveedor inválido',
    }),
});