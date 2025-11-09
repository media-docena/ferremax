/**
 * Capitaliza la primera letra de un string
 * @param {string} word - String a capitalizar
 * @returns {string} - String capitalizado
 */
function capitalizeFirstLetter(word) {
  if (typeof word !== 'string' || word.length === 0) {
    return '';
  }
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export default capitalizeFirstLetter;
