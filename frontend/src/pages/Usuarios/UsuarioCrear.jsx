// pages/Usuarios/UsuarioCrear.jsx
import React from 'react';
import UserForm from '../../components/Forms/UserForm';
import Breadcrumbs from '../../components/common/Breadcrumbs';

function UsuarioCrear() {
  const breadcrumbItems = [
    { label: 'Usuarios', href: '#' },
    { label: 'Crear Usuario' },
  ];

  return (
    <div>
      <Breadcrumbs items={breadcrumbItems} />
      <UserForm
        mode='create'
        onSubmit={(data) => console.log('Usuario creado:', data)}
        link={'/usuarios'}
      />
    </div>
  );
}

export default UsuarioCrear;