import React from 'react';
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router';
import Header from './components/layout/Header/Header';

function Layout() {
  // Cierra sesión removiendo al usuario de localStorage
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.removeItem('userSession')
    navigate('/login', { replace: true });
  }

  return (
    <>
      <div className='font-roboto flex flex-col min-h-screen bg-gray-100 text-gray-900'>
        <Header
          userName='Alberto Martinez'
          userRole='Administrador'
          onLogout={onLogout}
        />
        <main className='flex-grow p-6'>
          <div className='container max-w-7xl mx-auto'>
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}

export default Layout;
