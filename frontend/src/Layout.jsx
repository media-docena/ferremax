import React from 'react';
import { AuthContext } from './contexts/AuthContext';
import { Outlet, useNavigation } from 'react-router';
import { useSubmit, useLoaderData } from 'react-router';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';

function Layout() {
  // Obtenemos al usuario
  const { user } = useLoaderData();

  // Hook de react router para detectar navegación en progreso
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

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
          {/* Barra de progreso superior para mejora de UX */}
          {isLoading && (
            <div className='h-1 w-full bg-gray-200 overflow-hidden'>
              <div className='h-full bg-yellow-400 animate-progress'></div>
            </div>
          )}
          <main className='flex-grow p-6'>
            {/* Overlay con spinner de carga */}
            {isLoading && (
              <div className='absolute inset-0 bg-white/50 flex items-center justify-center z-40'>
                <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400'></div>
              </div>
            )}
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
