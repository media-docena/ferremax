import { carritoVentaService } from "../services/carritoVentaService";
import logger from '../../../config/logger';

export const createVentaAction = async ( ventaData ) => {
    try {
        const response = await carritoVentaService.createVenta(ventaData);
        logger.info('Venta creada exitosamente', { idVenta: response.data.idVenta });
        return response;
    } catch (error) {
        logger.error('Error al crear la venta', { error });
        throw error;
    }
};