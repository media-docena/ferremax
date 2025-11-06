import { authService } from '../services/authService';
import { redirect } from 'react-router';
import logger from '../../../config/logger';

// Actions para el manejo de autenticación
export const loginAction = async ({ request }) => {
  let formData;
  try {
    formData = await request.formData();
    const credentials = Object.fromEntries(formData);

    const response = await authService.login(credentials);

    const token = response.data.token;
    const user = response.data.user;

    // Guardamos el token y datos del usuario
    localStorage.setItem('token', token);
    localStorage.setItem('userSession', JSON.stringify(user));

    // Una vez logueado lo redirigimos a home
    return redirect('/');
  } catch (error) {
    logger.error('Error al iniciar sesión:', error.response?.data?.message);
    return {
      error: 'Credenciales inválidas. Intentar nuevamente',
      // Mantenemos el email en el formulario
      email: formData.get('correo'),
    };
  }
};

export const logoutAction = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userSession');
  return redirect('/login');
};
