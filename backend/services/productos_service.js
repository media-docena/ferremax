import prisma from '../prisma/prismaClient.js';

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
          { productoproveedor: { some: { proveedor: { nombre: { contains: searchTerm } } } } },
        ],
      }),
    };

    return await prisma.producto.findMany({
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
  
};
