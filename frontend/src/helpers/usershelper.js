export function filtrarUsuarioData(data) {
  const usuarioData = {};

  const numericFields = ['idRol'];
 
  for (const [key, value] of Object.entries(data)) {
    if (value === undefined || value === '') continue; 

    if (numericFields.includes(key)) {
      usuarioData[key] = parseInt(value);
    } else {
      usuarioData[key] = value;
    }
  }

  return usuarioData;
}