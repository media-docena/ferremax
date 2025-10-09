import React from 'react';
import Header from './components/layout/Header/Header';

function App() {
  return (
    <>
      <div className='font-roboto flex flex-col min-h-screen bg-gray-100 text-gray-900'>
        <Header
          userName='Alberto Martinez'
          userRole='Administrador'
          onLogout={() => console.log('Cerrar sesión')}
        />
        <main className='flex-grow p-6'>
          <div className='container mx-auto'></div>
        </main>
      </div>
    </>
  );
}

export default App;
