import React from 'react';
import { AuthContext } from './contexts/AuthContext';
import { Outlet } from 'react-router';
import { useSubmit, useLoaderData } from 'react-router';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';

function Layout() {
  // Obtenemos al usuario
  const { user } = useLoaderData();
  // Cierra sesión removiendo al usuario y el token de localStorage
  const submit = useSubmit();
  const onLogout = () => {
    submit(null, { method: 'post', action: '/logout' });
  };

  return (
    <>
      <AuthContext.Provider value={{ user, onLogout }}>
        <div className='font-roboto flex flex-col min-h-screen bg-gray-100 text-gray-900'>
          <Header
            userName={user ? user.nombre : 'Invitado'}
            userRole={user ? user.rol : ''}
            onLogout={onLogout}
          />
          <main className='flex-grow p-6'>
            <div className='container max-w-7xl mx-auto'>
              <Outlet />
            </div>
          </main>
          <Footer />
        </div>
      </AuthContext.Provider>
    </>
  );
}

export default Layout;
