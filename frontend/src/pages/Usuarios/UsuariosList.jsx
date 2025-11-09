import React from 'react';
import { useState, useEffect } from 'react';
import { useLoaderData, useFetcher } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
// Componentes
import Breadcrumbs from '../../components/common/Breadcrumbs';
import ActionButton from '../../components/common/Buttons/ActionButton';
import ActionIconButton from '../../components/common/Buttons/ActionIconButton';
import StatusBadge from '../../components/common/StatusBadge';
import ConfirmModal from '../../components/common/ConfirmModal';
import capitalizeFirstLetter from '../../helpers/utils';
import AlertMessage from '../../components/common/AlertMessage';
// Iconos
import AddIcon from '../../assets/icons/add.svg?react';
import VisibilityIcon from '../../assets/icons/visibility.svg?react';
import EditIcon from '../../assets/icons/edit.svg?react';
import DeleteIcon from '../../assets/icons/delete.svg?react';
import ArrowUpwardIcon from '../../assets/icons/arrow_upward.svg?react';
import UsuarioCrear from '/src/pages/Usuarios/UsuarioCrear.jsx';

function UsuariosList() {
  // Usuario logueado
  const { user: loggedUser } = useAuth();

  // Listado de usuarios
  const users = useLoaderData();

  const fetcher = useFetcher();

  const breadcrumbItems = [
    { label: 'Usuarios', href: '#' },
    { label: 'Listado de usuarios' },
  ];

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Muestra alertas cuando fetcher.data cambia
  useEffect(() => {
    if (fetcher.data?.success) {
      setSuccessMessage(
        fetcher.data.message || 'Estado actualizado exitosamente'
      );
      setErrorMessage(null);
    }
    if (fetcher.data?.error) {
      setErrorMessage(fetcher.data.error);
      setSuccessMessage(null);
    }
  }, [fetcher.data]);

  // Handlers del modal de acción
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [targetStatus, setTargetStatus] = useState(null);

  // Abre el modal de confirmación
  const handleOpenModal = (user, newStatus) => {
    setSelectedUser(user);
    setTargetStatus(newStatus);
    setIsModalOpen(true);
  };

  // Confirma el cambio de estado del usuario
   const handleConfirm = () => {
     if (selectedUser && targetStatus) {
       fetcher.submit(
         { estado: targetStatus },
         {
           method: 'post',
           action: `${selectedUser.idUsuario}/estado`,
         }
       );
     }
     setIsModalOpen(false);
     setSelectedUser(null);
     setTargetStatus(null);
   };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setTargetStatus(null);
  };

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

        {/* Alerta de éxito */}
        {successMessage && (
          <AlertMessage
            type='success'
            message={successMessage}
            duration={3000}
            onClose={() => setSuccessMessage(null)}
          />
        )}

        {/* Alerta de error */}
        {errorMessage && (
          <AlertMessage
            type='error'
            message={errorMessage}
            duration={5000}
            onClose={() => setErrorMessage(null)}
          />
        )}

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
              {users.data.map((user) => {
                if (loggedUser.idEmpleado === user.empleado.idEmpleado) {
                  return null;
                }

                // Verificamos si el usuario está siendo actualizado
                const isUpdating =
                  fetcher.state === 'submitting' &&
                  fetcher.formAction?.includes(user.idUsuario);

                return (
                  <tr
                    key={user.idUsuario}
                    className={`hover:bg-gray-100 ${
                      isUpdating ? 'opacity-50' : ''
                    }`}
                  >
                    <td className='p-4'>{user.empleado.nombre}</td>
                    <td className='p-4'>{user.empleado.apellido}</td>
                    <td className='p-4'>
                      {capitalizeFirstLetter(
                        user.usuariosrol[0].rol.descripcion
                      )}
                    </td>
                    <td className='p-4'>{user.correo}</td>

                    <td className='p-4'>{user.empleado.telefono}</td>
                    <td className='p-4'>
                      <StatusBadge
                        status={capitalizeFirstLetter(user.estado)}
                      />
                    </td>
                    {/* Action Buttons Column */}
                    <td className='p-4 flex justify-center items-center space-x-2'>
                      <ActionIconButton
                        icon={<VisibilityIcon />}
                        variant='info'
                        to={user.idUsuario.toString()}
                      />
                      <ActionIconButton
                        icon={<EditIcon />}
                        variant='warning'
                        to={`${user.idUsuario}/editar`}
                      />

                      {/* Botón de cambio de estado */}
                      {user.estado === 'inactivo' ? (
                        <button
                          type='button'
                          onClick={() => handleOpenModal(user, 'activo')}
                          disabled={isUpdating}
                          className='text-gray-500 hover:text-green-500 disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                          {isUpdating ? (
                            <div className='animate-spin h-5 w-5 border-2 border-gray-300 border-t-green-500 rounded-full' />
                          ) : (
                            <ArrowUpwardIcon />
                          )}
                        </button>
                      ) : (
                        <button
                          type='button'
                          onClick={() => handleOpenModal(user, 'inactivo')}
                          disabled={isUpdating}
                          className='text-gray-500 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                          {isUpdating ? (
                            <div className='animate-spin h-5 w-5 border-2 border-gray-300 border-t-red-500 rounded-full' />
                          ) : (
                            <DeleteIcon />
                          )}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mensaje cuando no hay usuarios */}
        {(!users.data || users.data.length === 0) && (
          <div className='text-center py-12 text-gray-500'>
            No se encontraron registros de usuarios
          </div>
        )}
      </div>

      {/* Modal */}
      <ConfirmModal
        isOpen={isModalOpen}
        color={targetStatus === 'inactivo' ? 'red' : 'green'}
        entityName={'usuario'}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default UsuariosList;
