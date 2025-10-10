import React from 'react'
import { Link } from 'react-router';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import StatusBadge from '../../components/common/StatusBadge';
import ActionButton from '../../components/common/Buttons/ActionButton'
import DetailFieldTitle from '../../components/common/DetailFieldTitle';
import ArrowBackIcon from '../../assets/icons/arrow_back.svg?react'
import DeleteIcon from '../../assets/icons/delete.svg?react'
import EditIcon from '../../assets/icons/edit.svg?react'

function UsuarioDetalle() {
  const breadcrumbItems = [
    { label: 'Usuarios', href: '/usuarios' },
    { label: 'Detalle de usuario' },
  ];

 const userData = {
    name: 'Alberto',
    surname: 'Martínez',
    dni: '32.657.951',
    role: 'Encargado',
    email: 'albertom@gmail.com',
    phone: '1123008800',
    address: 'Av. Corrientes 1234,C1043AAV, CABA',
    status: 'Activo',
    createdDate: '2023-01-10 09:30:15',
    updatedDate: '2023-10-26 14:05:40',
  }
  return (
    <div>
      <Breadcrumbs items={breadcrumbItems} />
      <div className='bg-white p-6 rounded-lg shadow-md'>
        <div className='flex justify-between items-center mb-8'>
          <h2 className='text-2xl font-bold text-gray-900'>
            Detalle de Usuario
          </h2>
          <Link
            className='flex items-center text-sm text-amber-500 hover:text-amber-600 font-roboto font-medium'
            to='/usuarios'
          >
            <span className='mr-2'>
              <ArrowBackIcon />
            </span>
            Volver al listado
          </Link>
        </div>

        {/* Details Section */}
        <div className='mb-6 pb-6 pt-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <DetailFieldTitle label='Nombre' value={userData.name} />
            <DetailFieldTitle label='Apellido' value={userData.surname} />
            <DetailFieldTitle label='DNI' value={userData.dni} />
            <DetailFieldTitle label='Rol' value={userData.role} />
            <DetailFieldTitle label='Correo' value={userData.email} />
            <DetailFieldTitle label='Teléfono' value={userData.phone} />
            <DetailFieldTitle label='Dirección' value={userData.address} />
            <DetailFieldTitle
              label='Estado'
              statusBadge={<StatusBadge status={userData.status} />}
            />
            <DetailFieldTitle
              label='Fecha de Creación'
              value={userData.createdDate}
            />
            <DetailFieldTitle
              label='Fecha de Actualización'
              value={userData.updatedDate}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className='mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-3'>
          <ActionButton
            label='Dar de baja'
            icon={<DeleteIcon />}
            variant='danger'
            onClick={() => console.log('Dar de baja')}
          />

          <ActionButton
            label='Editar'
            icon={<EditIcon />}
            variant='info'
            onClick={() => console.log('Editar')}
          />
        </div>
      </div>
    </div>
  );
}

export default UsuarioDetalle;