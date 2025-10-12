import React from 'react'
import Breadcrumbs from '../../components/common/Breadcrumbs';
import ActionButton from '../../components/common/Buttons/ActionButton';
import ActionIconButton from '../../components/common/Buttons/ActionIconButton';
import StatusBadge from '../../components/common/StatusBadge';
import AddIcon from '../../assets/icons/add.svg?react';
import VisibilityIcon from '../../assets/icons/visibility.svg?react';
import EditIcon from '../../assets/icons/edit.svg?react';
import DeleteIcon from '../../assets/icons/delete.svg?react';
import ArrowUpwardIcon from '../../assets/icons/arrow_upward.svg?react'
import UsuarioCrear from '/src/pages/Usuarios/UsuarioCrear.jsx';

function UsuariosList() {
  const breadcrumbItems = [
    { label: 'Usuarios', href: '#' },
    { label: 'Listado de usuarios' },
  ];

  const users = [
    {
      id: '001',
      name: 'Alberto',
      surname: 'Martinez',
      role: 'Administrador',
      email: 'albertom@gmail.com',
      phone: '1123008800',
      status: 'Activo',
      createdDate: '2025-10-10T18:50:22.169185',
      updatedDate: '2025-10-10T18:50:22.169185',
    },
    {
      id: '002',
      name: 'Gustavo',
      surname: 'Correa',
      role: 'Encargado',
      email: 'gustavoc@gmail.com',
      phone: '1176234589',
      status: 'Inactivo',
      createdDate: '2025-10-10T18:50:22.169185',
      updatedDate: '2025-10-10T18:50:22.169185',
    },
    {
      id: '003',
      name: 'José',
      surname: 'Herrera',
      role: 'Vendedor',
      email: 'joseh@gmail.com',
      phone: '1176234589',
      status: 'Activo',
      createdDate: '2025-10-10T18:50:22.169185',
      updatedDate: '2025-10-10T18:50:22.169185',
    },
    {
      id: '004',
      name: 'Manuel',
      surname: 'Catriel',
      role: 'Vendedor',
      email: 'manuelc@gmail.com',
      phone: '1198465782',
      status: 'Activo',
      createdDate: '2025-10-10T18:50:22.169185',
      updatedDate: '2025-10-10T18:50:22.169185',
    },
    {
      id: '005',
      name: 'Marta',
      surname: 'Hartmann',
      role: 'Administrador',
      email: 'marthah@gmail.com',
      phone: '1130287045',
      status: 'Activo',
      createdDate: '2025-10-10T18:50:22.169185',
      updatedDate: '2025-10-10T18:50:22.169185',
    },
    {
      id: '006',
      name: 'Analia',
      surname: 'Nuñez',
      role: 'Vendedor',
      email: 'analian@gmail.com',
      phone: '1198342074',
      status: 'Activo',
      createdDate: '2025-10-10T18:50:22.169185',
      updatedDate: '2025-10-10T18:50:22.169185',
    },
  ];

  return (
    <div>
      <Breadcrumbs items={breadcrumbItems} />
      <div className='bg-white p-6 rounded-lg shadow-lg'>
              <div className='flex justify-between items-center mb-6 flex-wrap gap-4'>
                <h2 className='text-2xl font-bold text-gray-900'>
                  Listado de Usuarios
                </h2>
                <div className='flex items-center gap-4'>
                  <ActionButton
                    label='Nuevo Usuario'
                    icon={<AddIcon />}
                    variant='warning'
                    to='crear'
                    onClick={UsuarioCrear}
                  />
                </div>
              </div>
      
              {/* Users List Table */}
              <div className='overflow-x-auto'>
                <table className='w-full whitespace-nowrap'>
                  <thead className='text-left text-sm font-semibold text-gray-500 border-b border-gray-200'>
                    <tr>
                      <th className='p-4'>Nombre</th>
                      <th className='p-4'>Apellido</th>
                      <th className='p-4'>Rol</th>
                      <th className='p-4'>Correo</th>
                      <th className='p-4'>Teléfono</th>
                      <th className='p-4'>Estado</th>
                      <th className='p-4 text-center'>Acciones</th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-200 text-sm'>
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        className='hover:bg-gray-100'
                      >
                        <td className='p-4'>{user.name}</td>
                        <td className='p-4'>{user.surname}</td>
                        <td className='p-4'>{user.role}</td>
                        <td className='p-4'>{user.email}</td>
                        
                        <td className='p-4'>{user.phone}</td>
                        <td className='p-4'>
                          <StatusBadge status={user.status} />
                        </td>
                        {/* Action Buttons Column */}
                        <td className='p-4 flex justify-center items-center space-x-2'>
                          <ActionIconButton icon={<VisibilityIcon />} variant='info' to={user.id} />
                          <ActionIconButton icon={<EditIcon />} variant='warning' to={`${user.id}/editar`} />
                          {user.status === 'Inactivo' ? (
                            <button className='text-gray-500 hover:text-green-500'>
                              <ArrowUpwardIcon />
                            </button>
                          ) : (
                            <button className='text-gray-500 hover:text-red-500'>
                              <DeleteIcon />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
    </div>
  );
}

export default UsuariosList