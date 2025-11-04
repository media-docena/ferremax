import prisma from '../prisma/prismaClient.js';
import logger from '../config/logger.js';
import { ApiError } from '../utils/ApiError.js';
import { Parser } from '@json2csv/plainjs';
import { CAMPOS } from '../utils/constants.js';

/**
 * Servicio para gestionar operaciones CRUD de Productos
 */

export default {
  async findAll(searchTerm = '') {
    const whereClause = {
      ...(searchTerm && {
        OR: [
          { codigo: { contains: searchTerm } },
          { nombre: { contains: searchTerm } },
          { marca: { nombre: { contains: searchTerm } } },
          { categoria: { nombre: { contains: searchTerm } } },
          {
            productoproveedor: {
              some: { proveedor: { nombre: { contains: searchTerm } } },
            },
          },
        ],
      }),
    };

    return await prisma.producto.findMany({
      orderBy: [
        {
          fechaCreacion: 'desc',
        },
      ],
      where: whereClause,
      include: {
        categoria: true,
        marca: true,
        productosunidad: {
          include: { unidad: true },
        },
        productoproveedor: {
          include: { proveedor: true },
        },
      },
    });
  },

  async findById(id) {
    try {
      return await prisma.producto.findUnique({
        where: { idProducto: id },
        include: {
          categoria: true,
          marca: true,
          productosunidad: {
            include: { unidad: true },
          },
          productoproveedor: {
            include: { proveedor: true },
          },
        },
      });
    } catch (error) {
      logger.error('Error al obtener el producto por ID:', error);
      throw new ApiError(error.status || 500, 'Error al crear el producto');
    }
  },

  async create(data) {
    try {
      const { idProveedor, idUnidad, idCategoria, idMarca, ...productData } =
        data;

      const createData = {
        ...productData,
        // Si se proporciona idProveedor lo incluye en data de creación
        ...(idProveedor && {
          productoproveedor: {
            create: {
              idProveedor: idProveedor,
            },
          },
        }),
        // Si se proporciona idUnidad lo incluye en data de creación
        ...(idUnidad && {
          productosunidad: {
            create: {
              idUnidad: idUnidad,
            },
          },
        }),

        ...(idMarca && {
          marca: {
            connect: { idMarca: idMarca },
          },
        }),

        ...(idCategoria && {
          categoria: {
            connect: { idCategoria: idCategoria },
          },
        }),
      };
      // Pasamos el objeto de creación a Prisma para crear el producto
      return await prisma.producto.create({
        data: createData,
        include: {
          productoproveedor: true,
          productosunidad: true,
          categoria: true,
          marca: true,
        },
      });
    } catch (error) {
      throw new ApiError(error.status || 500, 'Error al crear el producto');
    }
  },

  async update(id, data) {
    try {
      const { idProveedor, idUnidad, idCategoria, idMarca, ...productData } =
        data;

      const updateData = {
        ...productData,

        // Eliminar anteriores y crea uno nuevo
        ...(idProveedor !== undefined && {
          productoproveedor: {
            deleteMany: {},
            ...(idProveedor !== null && {
              create: {
                idProveedor: idProveedor,
              },
            }),
          },
        }),

        // Eliminar anteriores y crea la nueva
        ...(idUnidad !== undefined && {
          ProductosUnidad: {
            deleteMany: {},
            ...(idUnidad !== null && {
              create: {
                idUnidad: idUnidad,
              },
            }),
          },
        }),

        ...(idMarca && {
          marca: {
            connect: { idMarca: idMarca },
          },
        }),

        ...(idCategoria && {
          categoria: {
            connect: { idCategoria: idCategoria },
          },
        }),
      };

      return await prisma.producto.update({
        where: { idProducto: id },
        data: updateData,
        include: {
          productoproveedor: true,
          productosunidad: true,
          categoria: true,
          marca: true,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw ApiError.notFound('Producto no encontrado');
      }

      if (error.code === 'P2003') {
        throw ApiError.notFound('El proveedor o unidad especificado no existe');
      }

      throw new ApiError(
        error.status || 500,
        'Error al actualizar el producto'
      );
    }
  },

  async changeStatus(id, status) {
    try {
      return await prisma.producto.update({
        where: { idProducto: id },
        data: { estado: status },
        select: { idProducto: true, nombre: true, estado: true },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw ApiError.notFound('Producto no encontrado para actualizar');
      }

      if (error.code === 'P2003') {
        throw ApiError.badRequest('Relación inválida en la actualización');
      }
      throw ApiError.internal('Error al cambiar estado del producto');
    }
  },

  async findByCode(codigo) {
    try {
      return await prisma.producto.findUnique({
        where: { codigo: codigo },
      });
    } catch (error) {
      throw new ApiError(
        error.status || 500,
        'Error al obtener el producto por código'
      );
    }
  },
  /**
   * Exporta el listado de productos a formato CSV
   *
   * NOTA IMPORTANTE: Este endpoint funciona correctamente pero NO debe probarse
   * desde Swagger UI debido a limitaciones en el manejo de encoding UTF-8.
   *
   * Para probar este endpoint usá:
   * - curl: curl -H "Authorization: Bearer TOKEN" http://localhost:5000/api/v1/productos/exportar/csv -o inventario.csv
   * - HTTPie: http GET http://localhost:5000/api/v1/productos/exportar/csv "Authorization:Bearer TOKEN" > inventario.csv
   * - Postman: Send & Download
   * - Frontend: fetch() con response.blob()
   *
   * El archivo generado incluye BOM UTF-8 para correcta visualización de
   * caracteres especiales (á, é, í, ó, ú, ñ) en Excel.
   *
   * @returns {Promise<string>} CSV string con BOM UTF-8
   */
  async exportToCSV() {
    try {
      const productos = await prisma.producto.findMany({
        include: {
          categoria: true,
          marca: true,
          productoproveedor: {
            include: {
              proveedor: true,
            },
          },
          productosunidad: {
            include: {
              unidad: true,
            },
          },
        },
      });

      // Configura el parser con delimitador para Excel en español
      const json2csvParser = new Parser({
        fields: CAMPOS,
        delimiter: ';',
        withBOM: true, // UTF-8 BOM para acentos y ñ
        quote: '"',
        header: true,
      });

      return json2csvParser.parse(productos);
    } catch (error) {
      logger.error('Error al exportar el listado de productos a CSV:', error);
      throw new ApiError(
        error.status || 500,
        `Error al exportar el listado de productos a CSV ${error.message}`
      );
    }
  },
};
