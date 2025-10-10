import React from 'react';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import Logo from '../../assets/icons/logo.svg?react'

function Home() {
  const breadcrumbItems = [{ label: 'Home', href: '#' }];

  return (
    <div>
      <Breadcrumbs items={breadcrumbItems} />
      <div className='bg-white p-6 rounded-lg shadow-md font-roboto text-4xl font-bold text-center'>
        <span className='inline-block mx-auto p-6 bg-amber-400 rounded-md my-6'>
          <Logo />
        </span>
        <h1 className='p-2 mb-4'>
          Sistema de gestión{' '}
          <span className='underline decoration-yellow-400 decoration-4'>
            FerreMax
          </span>
        </h1>
        <h2 className='p-2 mb-4'>¡Bienvenido, Alberto!</h2>
      </div>
    </div>
  );
}

export default Home;
