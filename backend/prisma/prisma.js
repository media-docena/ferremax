import { PrismaClient } from '@prisma/client';
import logger from '../logger.js';

class PrismaService {
  constructor() {
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