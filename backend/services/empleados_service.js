import logger from '../config/logger.js';
import prisma from '../prisma/prismaClient.js';
import { ApiError } from '../utils/ApiError.js';

export default {
  async findByDNI(dni) {
    try {
        return await prisma.empleado.findUnique({
          where: { dni },
        });
    } catch (error) {
      logger.error('Error al buscar un empleado por DNI:', error);
      throw new ApiError(
        error.status || 500,
        'Error al buscar un empleado por DNI'
      );
    }
  },
};
