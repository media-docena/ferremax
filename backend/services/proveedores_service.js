import prisma from '../prisma/prismaClient.js';

export default {
    async findAll() {
        return await prisma.proveedor.findMany({});
    },
}