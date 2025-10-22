import prisma from '../prisma/prisma.js';

/**
 * Servicio para gestionar operaciones CRUD de Productos
 */

export default {
    async findAll() {
        return await prisma.productos.findMany();
    }
}