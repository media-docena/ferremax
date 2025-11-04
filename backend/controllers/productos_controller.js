import ProductService from '../services/productos_service.js';
import { sendOk, sendCreated } from '../utils/ResponseHelper.js';
import { ApiError } from '../utils/ApiError.js';
import logger from '../config/logger.js';
import { obtenerMensajeEstado } from './utils.js';

export default {
  // Listar productos del inventario con filtro opcional
  async listar(req, res, next) {
    try {
      const productos = await ProductService.findAll(req.query.search || '');

      if (!productos || productos?.length === 0)
        throw ApiError.notFound('No se encontraron registros');

      sendOk(res, 'Producto(s) obtenido(s) correctamente', productos);
    } catch (error) {
      logger.error('Error al listar productos', { error });
      next(error);
    }
  },
  // Obtener detalle un producto por ID
  async obtenerPorId(req, res, next) {
    try {
      const producto = await ProductService.findById(req.params.id);

      if (!producto) throw ApiError.notFound('Producto no encontrado');

      sendOk(res, 'Producto obtenido correctamente', producto);
    } catch (error) {
      logger.error('Error al obtener detalle un producto por ID', { error });
      next(error);
    }
  },

  async crear(req, res, next) {
    try {
      const existe = await ProductService.findByCode(req.body.codigo);

      if (existe) throw ApiError.conflict('El producto ya existe');

      const nuevoProducto = await ProductService.create(req.body);

      sendCreated(res, 'Producto registrado exitosamente', nuevoProducto);
    } catch (error) {
      logger.error('Error al obtener detalle un producto por ID', { error });
      next(error);
    }
  },

  async actualizar(req, res, next) {
    try {
      const productoActualizado = await ProductService.update(
        req.params.id,
        req.body
      );

      sendOk(res, 'Producto actualizado exitosamente', productoActualizado);
    } catch (error) {
      logger.error('Error al obtener detalle un producto por ID', {
        error,
      });
      next(error);
    }
  },
  // Cambia el estado de un producto
  async cambiarEstado(req, res, next) {
    try {
      const { id } = req.params;
      const { estado } = req.body;
      const productoActualizado = await ProductService.changeStatus(id, estado);

      if (!productoActualizado)
        throw ApiError.notFound(
          'Producto no encontrado para actualizar estado'
        );

      const mensaje = obtenerMensajeEstado(estado, 'Producto');

      sendOk(res, mensaje, productoActualizado);
    } catch (error) {
      logger.error('Error al cambiar el estado del producto', { error });
      next(error);
    }
  },

  async exportarCSV(req, res, next) {
    try {
      const csvFile = await ProductService.exportToCSV();

      // Genera el nombre del archivo con fecha
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `inventario_ferremax_${timestamp}.csv`;

      // Configura los headers para la descarga
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${filename}"`
      );

      // Envía el archivo CSV
      res.status(200).send(csvFile);

    } catch (error) {
      logger.error('Error al exportar productos del inventario a CSV', { error });
      next(error);
    }
  },
};
