/**
 * Capitaliza la primera letra de un string
 * @param {string} word - String a capitalizar
 * @returns {string} - String capitalizado
 */
export function capitalizeFirstLetter(word) {
  if (typeof word !== 'string' || word.length === 0) {
    return '';
  }
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function formatErrors(errors = []) {
   const backendErrors = {};
   errors.forEach((err) => {
     const field = err.field;
     if (!backendErrors[field]) {
       backendErrors[field] = [];
     }
     backendErrors[field].push(err.message);
   });
   return backendErrors;
}
