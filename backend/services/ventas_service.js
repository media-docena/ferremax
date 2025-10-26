import prisma from '../prisma/prismaClient.js';
import { ApiError } from '../utils/ApiError.js';

/**
 * Servicio para gestionar operaciones de Reporte de Ventas
 */

export default {
  async findAll(searchTerm = '', fechaDesde = null, fechaHasta = null, formaPago = '') {
    try {
      /**===============================================
       * Intenta convertir el searchTerm a número
       * si el término del filtrado es el id de la venta
       *=================================================*/
      const codigoNumerico =
        !isNaN(searchTerm) && searchTerm.trim() !== ''
          ? parseInt(searchTerm, 10)
          : null;
      const whereClause = {
        // Primero filtra por id de la venta o nombre del vendedor
        ...(searchTerm && {
          OR: [
            ...(codigoNumerico !== null
              ? [
                  {
                    idVenta: codigoNumerico,
                  },
                ]
              : []),
            { empleado: { nombre: { contains: searchTerm } } },
          ],
        }),
        // Luego filtra por rango de fechas si se proporcionan
        ...(fechaDesde &&
          fechaHasta && {
            fechaVenta: {
              gte: new Date(fechaDesde),
              lte: new Date(fechaHasta),
            },
          }),
        // Finalmente filtra por método de pago si se proporciona
        ...(formaPago && { formapago: formaPago }),    
      };

      const [ventas, total] = await Promise.all([
        prisma.venta.findMany({
          orderBy: [{ fechaCreacion: 'desc' }],
          where: whereClause,
          include: {
            formapago: true,
            empleado: true,
          },
        }),
        prisma.venta.count({ where: whereClause }),
      ]);

      return { total, ventas };

    } catch (error) {
        throw new ApiError(error.status || 500, error.message || 'Error al obtener las ventas');
    }
  },
};
