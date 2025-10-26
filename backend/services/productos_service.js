import prisma from '../prisma/prismaClient.js';
import { ApiError } from '../utils/ApiError.js';

/**
 * Servicio para gestionar operaciones CRUD de Productos
 */

export default {
  async findAll(searchTerm = '') {
    /**===============================================
     * Intenta convertir el searchTerm a número
     * si el término del filtrado es el id del producto
     *=================================================*/
    const codigoNumerico =
      !isNaN(searchTerm) && searchTerm.trim() !== ''
        ? parseInt(searchTerm, 10)
        : null;

    const whereClause = {
      ...(searchTerm && {
        OR: [
          ...(codigoNumerico !== null
            ? [
                {
                  idProducto: codigoNumerico,
                },
              ]
            : []),
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
  },

  async create(data) {
    try {
      const { idProveedor, idUnidad, idCategoria, idMarca, ...productData } = data;

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
      throw new ApiError(
        error.status || 500,
        'Error al crear el producto'
      );
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

      throw new ApiError(
        error.status || 500,
        'Error al actualizar el producto'
      );
    }
  },
};
