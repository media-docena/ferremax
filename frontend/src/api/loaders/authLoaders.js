import { redirect } from 'react-router';

// Loader para verificar autenticación
export const loginLoader = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return redirect('/login');
  }
  return null;
};
