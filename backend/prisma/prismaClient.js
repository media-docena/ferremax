import { PrismaClient } from '@prisma/client';
import logger from '../config/logger.js';

class PrismaService {
  constructor() {
    try {
      if (!PrismaService.instance) {
        this.client = new PrismaClient({
          log:
            process.env.NODE_ENV === 'development'
              ? ['query', 'error', 'warn']
              : ['error'],
          errorFormat: 'pretty',
        });
        PrismaService.instance = this;
      }
      return PrismaService.instance;
    } catch (error) {
      logger.error('Error al inicializar Prisma Client:', error.message);
      throw new Error(
        'Prisma Client no pudo inicializarse. Ejecutar "npx prisma generate"'
      );
    }
  }

  async connect() {
    await this.client.$connect();
    logger.info('Base de datos conectada');
  }

  async disconnect() {
    await this.client.$disconnect();
    logger.info('Base de datos desconectada');
  }
}

const prismaService = new PrismaService();
export default prismaService.client;
