import React from 'react'
import { Link } from 'react-router';

function ActionIconButton({ icon, variant = 'neutral', to='#', type, onClick = null }) {
  // Clases de color por variante
  const variants = {
    success: 'text-gray-500 hover:bg-green-500',
    warning: 'text-gray-500 hover:text-yellow-500',
    danger: 'text-gray-500 hover:text-red-500',
    info: 'text-gray-500 hover:text-blue-500',
    neutral: 'text-gray-500 hover:text-gray-400',
  };

  // Clases base compartidas
  const baseClasses = `
    ${variants[variant]}
    transition-colors duration-200
    focus:outline-none
  `;

  // Navegación interna (React Router)
  if (type) {
    return (
      <button type={type} onClick={onClick} className={baseClasses}>
        {icon}
      </button>
    );
  }
  return (
    <Link to={to} className={baseClasses}>
      {icon}
    </Link>
  );
}

export default ActionIconButton;