import prisma from '../prisma/prismaClient.js';
import { Prisma } from '@prisma/client';
import { ApiError } from '../utils/ApiError.js';
import logger from '../config/logger.js';

export default {

    // Obtiene los productos que están activos y con stock mayor a 0, aplica filtro por searchTerm de ID, NOMBRE o CATEGORIA
    async getProductosDisponibles(searchTerm = '') {
        try { 
            const whereClause = {
                estado: 'activo',
                stock: { gt: 0 },
                ...(searchTerm && {
                    OR: [
                        { codigo: { contains: searchTerm } },
                        { nombre: { contains: searchTerm } },
                        { categoria: { nombre: { contains: searchTerm } } },
                    ],   
                }),
            };
            return await prisma.producto.findMany({
                orderBy: [ { idProducto: 'asc' }, ],
                where: whereClause,
                include: {
                    categoria: true,
                }
            });
        } catch (error) {
            logger.error('Error al obtener productos disponibles:', error);
            throw new ApiError(error.status || 500, 'Error al obtener los productos disponibles');
        }
    },

    // Crear venta, verificando existencia de productos, datos validos, stock suficiente y descuento del mismo
    async createVenta( { idEmpleado, idFormaPago, productos } ) {
        try {
            // Validar que la lista de productos recibida no esté vacía 
            if (!productos || productos.length === 0) {
                throw ApiError.badRequest('La venta debe incluir al menos un producto');
            }
            // Validar que cada producto tenga un idProducto y cantidad válidos
            for (const p of productos) {
                if (!p.idProducto || p.cantidad <= 0 || p.precio < 0 || p.subtotal < 0) {
                    throw ApiError.badRequest('Datos de producto inválidos en la venta');
                } 
            }
            return await prisma.$transaction(async (tx) => {
                // Individualizamos los IDs de los productos del carrito
                const ids = productos.map(p => p.idProducto);
                // Traemos los productos desde la DB con los IDs del carrito
                const productosDB = await tx.producto.findMany({
                    where: { idProducto: { in: ids } },
                    select: { idProducto: true, nombre: true, stock: true, precio: true }
                });
                // Verificamos que la cantidad de productos de la DB sea igual a la del carrito
                if (productosDB.length !== productos.length) {
                    throw ApiError.badRequest('Uno o más productos no existen');
                }
                else {
                    // Verificamos que haya stock suficiente para cada producto
                    for (const p of productos) {
                        const productoDB = productosDB.find(pdb => p.idProducto === pdb.idProducto);
                        if (productoDB.stock < p.cantidad) {
                            throw ApiError.badRequest(`Stock insuficiente para el producto: ${productoDB.nombre}`);
                        };
                    }
                }

                //  Verificamos que el empleado y la forma de pago recibida existan
                const empleado = await tx.empleado.findUnique({ where: { idEmpleado } });
                const formaPago = await tx.formaPago.findUnique({ where: { idFormaPago } });
                if (!empleado || !formaPago) throw ApiError.badRequest('Empleado o forma de pago inválido');

                // Actualizamos el stock con un solo UPDATE usando CASE
                if (productos.length > 0) {
                    // Construir el query dinámicamente
                    const caseStatements = productos.map((p, index) => 
                        Prisma.sql`WHEN idProducto = ${p.idProducto} THEN stock - ${p.cantidad}`
                    );
                    
                    const ids = productos.map(p => p.idProducto);
                    
                    // Combinar los CASE usando Prisma.join
                    await tx.$executeRaw`
                        UPDATE defaultdb.Productos 
                        SET stock = CASE 
                            ${Prisma.join(caseStatements, ' ')}
                        END,
                        fechaActualizacion = NOW()
                        WHERE idProducto IN (${Prisma.join(ids, ',')})
                    `;
                }

                // Calculo total de venta
                let totalVenta = 0;
                for (const p of productos) {
                    totalVenta += p.subtotal;
                }

                // Creamos la venta con nested create de detalles
                const venta = await tx.venta.create({
                    data: {
                        idEmpleado,
                        idFormaPago,
                        fecha: new Date(),
                        hora: new Date(),
                        totalVenta: totalVenta,
                        detalleventa: {
                            create: productos.map(p => ({
                                idProducto: p.idProducto,
                                cantidad: p.cantidad,
                                precio: p.precio,
                                subtotal: p.subtotal
                            }))
                        }
                    },
                    include: {
                        detalleventa: { include: { producto: true} },
                        empleado: true,
                        formapago: true
                    }
                });
                return venta;
            });
        } catch (error) {
            logger.error('Error al crear la venta:', error);
            // Si el error ya es un ApiError, preservar su mensaje
            if (error.status) {
                throw error;
            }
            // Si es otro tipo de error, envolverlo
            throw new ApiError(500, error.message || 'Error al crear la venta');
        }
    },

    // Obtiene la venta con todos sus detalles para la generacion de la factura
    async getVentaById (id){
        try {
            // Verificamos que el id recibido sea valido
            if (!id || isNaN(id) || id <= 0) throw ApiError.badRequest('ID de venta invalido');

            // Obtenemos la venta por el ID
            const venta = await prisma.venta.findUnique({
                where: { idVenta: Number(id) },
                include: {
                    detalleventa: {
                        include: { producto: true }
                    },
                    empleado: true,
                    formapago: true     
                }
            });

            // Verificamos que el resultado no sea null
            if (!venta) throw ApiError.badRequest('No se pudo obtener la venta.');

            return venta;
        }
        catch (error) {
            logger.error('Error al obtener la venta:', error);
            throw new ApiError(error.status || 500, 'Error al obtener la venta');
        }
    }
}