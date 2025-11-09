
/**
 * Calcula el highlight de un producto basado en stock y fecha de vencimiento
 * @param {Object} producto - Objeto producto del backend
 * @returns {string|null} - Tipo de highlight: 'out-of-stock' | 'low-stock' | 'expiring' | null
 */
export function getProductHighlight(producto) {
  // 1. Stock agotado 
  if (producto.stock === 0) {
    return 'out-of-stock';
  }

  // 2. Stock bajo
  if (producto.stockMin > 1 && producto.stock < producto.stockMin) {
    return 'low-stock';
  }

  // 3. Próximo a vencer (si tiene fecha de vencimiento)
  if (producto.fechaVencimiento) {
    const fechaVencimiento = new Date(producto.fechaVencimiento);
    const fechaActual = new Date();
    const diasHastaVencimiento = Math.floor(
      (fechaVencimiento - fechaActual) / (1000 * 60 * 60 * 24)
    );

    // Si faltan 30 días o menos y aún no venció
    if (diasHastaVencimiento <= 30 && diasHastaVencimiento >= 0) {
      return 'expiring';
    }
  }

  return null;
}

/**
 * Formatea una fecha en formato ISO (yyyy-mm-dd o yyyy-mm-ddTHH:mm:ssZ)
 * al formato argentino dd/mm/yyyy **sin aplicar conversión de zona horaria**.
 * 
 * Esta función toma únicamente la porción de fecha (`yyyy-mm-dd`) del valor recibido
 * y genera una cadena en formato argentino (`dd/mm/yyyy`), evitando el desfase
 * de un día que puede ocurrir al usar objetos `Date` con zonas horarias distintas.
 *
 * @example
 * formatFechaArgentina("2025-09-18T00:00:00.000Z"); // ➜ "18/09/2025"
 * formatFechaArgentina("2025-09-18");               // ➜ "18/09/2025"
 *
 * @param {string} fecha - Cadena en formato ISO o `yyyy-mm-dd` que representa una fecha.
 * @returns {string} - Fecha formateada en formato argentino `dd/mm/yyyy` o 'N/A' si no es válida.
 */
export function formatFechaArgentina(fecha) {
  if (!fecha) return 'N/A';

  // Tomamos solo la parte de la fecha
  const [year, month, day] = fecha.split('T')[0].split('-');

  if (!year || !month || !day) return 'N/A';

  return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
}

/**
 * Formatea el precio en formato argentino
 * @param {string|number} precio - Precio del producto
 * @returns {string} - Precio formateado
 */
export function formatPrecio(precio) {
  const precioNumero = parseFloat(precio);
  if (isNaN(precioNumero)) return '$0.00';

  return precioNumero.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
  });
}

/**
 * Formatea hora al formato argentino 15:45
 * @param {string} hora - Hora en formato ISO
 * @returns {string} - Hora formateada o 'N/A'
 */
export function formatHoraArgentina(hora) {
  if (!hora) return 'N/A';

  const date = new Date(hora);

  // Verificamos si la hora es válida
  if (isNaN(date.getTime())) return 'N/A';

  return date.toLocaleTimeString('es-AR', {
    timeZone: 'America/Argentina/Buenos_Aires',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

/**
 * Capitaliza la primera letra de un string
 * @param {string} str - String a capitalizar
 * @returns {string} - String capitalizado
 */
export function capitalizeFirstLetter(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Extrae el nombre del archivo de la cabecera Content-Disposition
export function extractFilenameFromHeader(contentDisposition) {
  if (!contentDisposition) return null;

  const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/i);
  return filenameMatch ? filenameMatch[1] : null;
}

/**
 * Descarga un archivo blob con un nombre especificado
 * @param {Blob} blob - Blob del archivo
 * @param {string} filename - Nombre del archivo
 */
export function downloadFile(blob, filename) {

  const url = window.URL.createObjectURL(blob);
  
  // Crea un elemento <a> temporal
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  
  // Agrega al DOM, realiza el clic y remueve el elemento
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Libera la memoria
  window.URL.revokeObjectURL(url);
}
