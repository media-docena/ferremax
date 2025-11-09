import { Prisma } from '@prisma/client';
import prisma from '../prisma/prismaClient.js';
import { ApiError } from '../utils/ApiError.js';

/**
 * Servicio para gestionar operaciones de Reporte de Ventas
 */

export default {
  async findAll(
    searchTerm = '',
    fechaDesde = null,
    fechaHasta = null,
    formaPago = ''
  ) {
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
            {
              empleado: {
                nombre: { contains: searchTerm, },
              },
            },
            {
              empleado: {
                apellido: { contains: searchTerm, },
              },
            },
          ],
        }),
        // Luego filtra por rango de fechas si se proporcionan
        ...(fechaDesde &&
          fechaHasta && {
            fecha: {
              gte: new Date(fechaDesde),
              lte: new Date(fechaHasta),
            },
          }),
        // Finalmente filtra por método de pago si se proporciona
        ...(formaPago && {
          formapago: {
            descripcion: {
              contains: formaPago,
            },
          },
        }),
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
        prisma.venta.count(),
      ]);

      return { total, ventas };
    } catch (error) {
      throw new ApiError(
        error.status || 500,
        error.message || 'Error al obtener las ventas'
      );
    }
  },

  async getTopProductos(limit = 3) {
    try {
      const query = Prisma.sql`SELECT 
          p.idProducto,
          p.nombre,
          c.nombre as categoria,
          m.nombre as marca,
          SUM(dv.cantidad) as cantidadVendida,
          SUM(dv.subtotal) as totalVentas,
          COUNT(DISTINCT dv.idVenta) as numeroTransacciones
        FROM DetalleVenta dv
        INNER JOIN Productos p ON dv.idProducto = p.idProducto
        LEFT JOIN Categoria c ON p.idCategoria = c.idCategoria
        LEFT JOIN Marca m ON p.idMarca = m.idMarca
        GROUP BY p.idProducto, p.nombre, c.nombre, m.nombre
        ORDER BY cantidadVendida DESC
        LIMIT ?`;

      query.values = [limit];

      const topProductos = await prisma.$queryRaw(query);

      return topProductos.map((producto) => ({
        idProducto: producto.idProducto,
        nombre: producto.nombre,
        categoria: producto.categoria,
        marca: producto.marca,
        cantidadVendida: Number(producto.cantidadVendida),
        totalVentas: Number.parseFloat(producto.totalVentas).toFixed(2),
        numeroTransacciones: Number(producto.numeroTransacciones),
      }));

    } catch (error) {
      throw new ApiError(error.status || 500, error.message || 'Error al obtener productos más vendidos');
    }
  },
};
