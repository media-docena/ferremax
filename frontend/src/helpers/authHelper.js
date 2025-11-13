export const requireRole = (user, allowedRoles = []) => {
  if (!user || !allowedRoles.includes(user.rol)) {
    return {
      error: 'No tenés permisos para realizar esta acción',
    };
  }
  return null;
};
