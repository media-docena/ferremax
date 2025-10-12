import { redirect } from 'react-router'
import { createContext } from 'react-router';

function authMiddleware({ context }) {
  const userContext = createContext(null);
  const user =  localStorage.getItem('userSession');

  if (!user) {
    throw redirect('/login');
  }
    const userSession = JSON.parse(user);
    context.set(userContext, userSession);
}

export default authMiddleware;