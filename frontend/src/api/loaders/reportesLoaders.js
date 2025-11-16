import { reporteService } from '../services/reporteService';
import logger from '../../../config/logger'

export const reportesLoader = async ({ request }) => {
    try {
        const url = new URL(request.url);
        const searchParams = Object.fromEntries(url.searchParams);

        const [ventasResponse, topProductosResponse] = await Promise.all([
            reporteService.getAll(searchParams),
            reporteService.getVentasTopProductos()
        ])

        return {
          ventas: ventasResponse.data?.ventas || [],
          totalVentas: ventasResponse.data?.total || 0,
          topProductos: topProductosResponse.data || [],
        };

    } catch (error) {
        logger.error('Error al obtener listado de ventas:', error);
        if (error.response?.status === 404) {
          return {
            usuario: [],
            status: 404,
            message: error.response.data?.message || 'Reportes de ventas no encontrado',
          };
        }
        throw error;
    }

}
    