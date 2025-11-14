/**
 * Formatea una fecha ISO a formato legible (ej: "12/11/2025" o "12 de Noviembre, 2025")
 */
export const formatFecha = (fechaISO) => {
  if (!fechaISO) return 'Fecha no disponible';
  
  const fecha = new Date(fechaISO);
  
  // Opción 1: Formato corto DD/MM/YYYY
  return fecha.toLocaleDateString('es-AR');
  
  // Opción 2: Formato largo "12 de Noviembre, 2025"
  // return fecha.toLocaleDateString('es-AR', { 
  //   day: 'numeric', 
  //   month: 'long', 
  //   year: 'numeric' 
  // });
};

/**
 * Formatea una hora ISO extrayendo solo HH:MM:SS (ej: "23:33:06")
 */
export const formatHora = (horaISO) => {
  if (!horaISO) return 'Hora no disponible';
  
  const fecha = new Date(horaISO);
  
  // Extrae solo la hora en formato HH:MM:SS
  return fecha.toLocaleTimeString('es-AR', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit',
    hour12: false // Formato 24 horas
  });
};