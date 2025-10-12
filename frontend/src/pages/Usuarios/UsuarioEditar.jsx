import React from 'react';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import UserForm from '../../components/Forms/UserForm';


function UsuarioEditar() {
  const breadcrumbItems = [
    { label: 'Usuario', href: '#' },
    { label: 'Edición de usuario' },
  ];

  const initialUser = {
    id: '001',
    nombre:'Alberto',   
    apellido: 'Martinez',
    correo: 'albertom@gmail.com',
    telefono: '+54 9 11 23008800',
    dni: '32.657.951',
    rol: 'administrador',
    estado: 'activo',
    direccion: 'Av. Corrientes 1234,C1043AAV, CABA',
  };

  return (
    <div>
      <Breadcrumbs items={breadcrumbItems} />
      <UserForm
        mode='edit'
        initialData={initialUser}
        onSubmit={(data) => console.log('Usuario editado:', data)}
        link={'/usuarios'}
      />
    </div>
  );
}

export default UsuarioEditar;