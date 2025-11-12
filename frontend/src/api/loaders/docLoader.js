import logger from '../../../config/logger';
import { docService } from '../services/docService';

export const docLoader = async () => {
  try {
    const response = await docService.getDocs();
    return response;
  } catch (error) {
    logger.error('Error al obtener listado de documentos:', error);
    throw error;
  }
};
