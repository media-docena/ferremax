
/**
 * Genera un mensaje de respuesta en función del estado y la entidad proporcionada.
 *
 * @param {string} status - El estado actual de la entidad pasodo en el body (por ejemplo, 'activo' o 'inactivo').
 * @param {string} entity - El nombre de la entidad sobre la que se aplica la acción (por ejemplo, 'Producto' o 'Usuario').
 * @returns {string} Un mensaje descriptivo indicando si la entidad fue activada o desactivada exitosamente.
 *
 * @example
 * obtenerMensajeEstado('activo', 'Producto');
 * Retorna: "Producto desactivado exitosamente"
 * 
 */
export function obtenerMensajeEstado(status, entity) {
  if (typeof status !== 'string') {
    return 'Estado inválido';
  }

  return status === 'activo'
    ? `${entity} activado exitosamente`
    : `${entity} desactivado exitosamente`;
}
