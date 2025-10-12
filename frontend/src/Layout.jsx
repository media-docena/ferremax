import React from 'react';
import { Outlet } from 'react-router';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';

function Layout() {
  return (
    <>
      <div className='font-roboto flex flex-col min-h-screen bg-gray-100 text-gray-900'>
        <Header
          userName='Alberto Martinez'
          userRole='Administrador'
          onLogout={() => console.log('Cerrar sesión')}
        />
        <main className='flex-grow p-6'>
          <div className='container max-w-7xl mx-auto'>
            <Outlet />
          </div>
        </main>
        <Footer/>
      </div>
    </>
  );
}

export default Layout;
