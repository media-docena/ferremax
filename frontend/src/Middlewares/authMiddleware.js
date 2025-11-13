import { redirect } from 'react-router';
import { userContext } from '../contexts/context';
import logger from '../../config/logger';

export function authMiddleware({ context }) {
  const user = localStorage.getItem('userSession');
  const token = localStorage.getItem('token');

  if (!token || !user) {
    throw redirect('/login');
  }

  try {
    const userSession = JSON.parse(user);
    context.set(userContext, userSession);
  } catch (error) {
    logger.error('Error al parsear el usuario en auth:', error);
    localStorage.removeItem('userSession');
    localStorage.removeItem('token');
    throw redirect('/login');
  }
}

// Middleware para verificar roles específicos
export function roleMiddleware(allowedRoles = []) {
  return async function ({ context }) {
    const user = context.get(userContext);

    if (allowedRoles.length > 0 && !allowedRoles.includes(user.rol)) {
      // Redirigimos o lanzamos error 403
      throw new Response('No tenés permisos para acceder a este recurso', {
        status: 403,
        statusText: 'Forbidden',
      });
    }

    return null;
  };
}
