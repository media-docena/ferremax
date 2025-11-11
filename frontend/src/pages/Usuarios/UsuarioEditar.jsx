import React from 'react';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import UserForm from '../../components/Forms/UserForm';
import { useLoaderData } from 'react-router';


function UsuarioEditar() {
 
  const { usuario } = useLoaderData();

  const breadcrumbItems = [
    { label: 'Usuario', href: '#' },
    { label: 'Edición de usuario' },
  ];

  const initialData = {
    nombre: usuario.empleado.nombre,   
    apellido: usuario.empleado.apellido,
    correo: usuario.correo,
    telefono: usuario.empleado.telefono || '',
    dni: usuario.empleado.dni || '',
    idRol: usuario.usuariosrol[0].rol.idRol.toString(),
    estado: usuario.estado,
    direccion: usuario.empleado.direccion || '',
  };

  return (
    <div>
      <Breadcrumbs items={breadcrumbItems} />
      <UserForm
        mode='edit'
        initialData={initialData}
      />
    </div>
  );
}

export default UsuarioEditar;