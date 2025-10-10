// common/actionbutton/ActionButton.jsx
/**
 * ActionButton Component
 * ---------------------------------------------------------------
 * Botón reutilizable con soporte para acciones, enlaces internos y externos.
 * 
 * - Permite definir ícono opcional, texto y color (variant).
 * - Adapta automáticamente su tipo según las props:
 * - Si recibe `onClick`, actúa como <button>.
 * - Si recibe `to`, actúa como <Link> (React Router).
 * - Si recibe `href`, actúa como <a>.
 * 
 * Ejemplo de uso:
 * <ActionButton
 *   label="Nuevo Producto"
 *   icon={<AddIcon className="w-5 h-5" />}
 *   variant="warning"
 *   to="/productos/nuevo"
 * />
 */

import { Link } from 'react-router';

/**
 * @param {Object} props - Propiedades del componente.
 * @param {string} [props.label='Acción'] - Texto a mostrar dentro del botón.
 * @param {JSX.Element} [props.icon] - Ícono opcional que se mostrará a la izquierda del texto.
 * @param {'success' | 'warning' | 'danger' | 'info' | 'neutral'} [props.variant='neutral']
 *   Variante de color del botón.
 * @param {'button' | 'submit' | 'reset'} [props.type='button'] - Tipo de botón HTML.
 * @param {Function} [props.onClick] - Función que se ejecutará al hacer clic.
 * @param {string} [props.to] - Ruta interna (usa <Link> de React Router).
 * @param {string} [props.href] - Enlace externo (usa <a>).
 * @param {string} [props.target] - Target opcional, por ejemplo "_blank".
 */
function ActionButton ({
  label = 'Acción',
  icon = null,
  variant = 'neutral',
  type = 'button',
  onClick,
  to,
  href,
  target,
}) {
  // Clases de color por variante
  const variants = {
    success: 'bg-green-500 hover:bg-green-600 text-white',
    warning: 'bg-yellow-400 hover:bg-yellow-500 text-gray-800',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    info: 'bg-blue-500 hover:bg-blue-600 text-white',
    neutral: 'bg-gray-300 hover:bg-gray-400 text-gray-800',
  };

  // Clases base compartidas
  const baseClasses = `
    ${variants[variant]}
    font-roboto font-semibold py-2 px-4 rounded-lg
    inline-flex items-center transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-1
    focus:ring-gray-300
  `;

  // Navegación interna (React Router)
  if (to) {
    return (
      <Link to={to} className={baseClasses}>
        {icon && <span className="mr-2">{icon}</span>}
        {label}
      </Link>
    );
  }

  // Enlace externo
  if (href) {
    return (
      <a href={href} target={target} rel="noopener noreferrer" className={baseClasses}>
        {icon && <span className="mr-2">{icon}</span>}
        {label}
      </a>
    );
  }

  // Botón clásico (acción local)
  return (
    <button type={type} onClick={onClick} className={baseClasses}>
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </button>
  );
};

export default ActionButton;
