import React, { useState, useEffect} from 'react';
import { Link, useLoaderData, useFetcher } from 'react-router';
import { formatFechaArgentina, capitalizeFirstLetter } from '../../helpers/productsHelper';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import StatusBadge from '../../components/common/StatusBadge';
import ActionButton from '../../components/common/Buttons/ActionButton';
import DetailFieldTitle from '../../components/common/DetailFieldTitle';
import ArrowBackIcon from '../../assets/icons/arrow_back.svg?react';
import DeleteIcon from '../../assets/icons/delete.svg?react';
import EditIcon from '../../assets/icons/edit.svg?react';
import ArrowUpIcon from '../../assets/icons/arrow_upward.svg?react';
import ConfirmModal from '../../components/common/ConfirmModal';
import AlertMessage from '../../components/common/AlertMessage';

function UsuarioDetalle() {
  const { usuario, error } = useLoaderData();
  const fetcher = useFetcher();

  const breadcrumbItems = [
    { label: 'Usuarios', href: '/usuarios' },
    { label: 'Detalle de usuario' },
  ];

  // Estados del modal y alertas
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setselectedUser] = useState(null);
    const [targetStatus, setTargetStatus] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
  
    const isUpdating = fetcher.state !== 'idle';
  
    // Maneja las alertas cuando fetcher.data cambia
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
  
    const handleOpenModal = (product, newStatus) => {
      setselectedUser(product);
      setTargetStatus(newStatus);
      setIsModalOpen(true);
    };
  
    const handleConfirm = () => {
      if (selectedUser && targetStatus) {
        fetcher.submit(
          { estado: targetStatus },
          {
            method: 'post',
            action: 'estado',
          }
        );
      }
      setIsModalOpen(false);
      setselectedUser(null);
      setTargetStatus(null);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
      setselectedUser(null);
      setTargetStatus(null);
    };

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

        {/* Alert Messages */}
        {successMessage && (
          <AlertMessage
            type='success'
            message={successMessage}
            duration={3000}
            onClose={() => setSuccessMessage(null)}
          />
        )}
        {errorMessage && (
          <AlertMessage
            type='error'
            message={errorMessage}
            duration={5000}
            onClose={() => setErrorMessage(null)}
          />
        )}

        {/* Details Section */}
        <div className='mb-6 pb-6 pt-6 border-t border-gray-200'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <DetailFieldTitle label='Nombre' value={usuario.empleado.nombre} />
            <DetailFieldTitle label='Apellido' value={usuario.empleado.apellido} />
            <DetailFieldTitle label='DNI' value={usuario.empleado.dni} />
            <DetailFieldTitle label='Rol' value={usuario.usuariosrol[0].rol.descripcion} />
            <DetailFieldTitle label='Correo' value={usuario.correo} />
            <DetailFieldTitle
              label='Teléfono'
              value={usuario.empleado.telefono || '-'}
            />
            <DetailFieldTitle
              label='Dirección'
              value={usuario.empleado.direccion || '-'}
            />
            <DetailFieldTitle
              label='Estado'
              statusBadge={
                <StatusBadge status={capitalizeFirstLetter(usuario.estado)} />
              }
            />
            <DetailFieldTitle
              label='Fecha de Creación'
              value={formatFechaArgentina(usuario.fechaCreacion, true)}
            />
            <DetailFieldTitle
              label='Fecha de Actualización'
              value={formatFechaArgentina(usuario.fechaActualizacion, true)}
            />
          </div>
        </div>

        {/* Mensaje cuando no se ecuentra un usuario */}
        {(!usuario || error?.status === 404) && (
          <div className='text-center py-12 text-gray-500'>
            Usuario no encontrado
          </div>
        )}

        {/* Action Buttons */}
        <div className='mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-3'>
          {usuario.estado === 'activo' ? (
            <ActionButton
              type='button'
              label='Dar de baja'
              icon={<DeleteIcon />}
              variant='danger'
              disabled={isUpdating}
              isLoading={isUpdating}
              onClick={() => handleOpenModal(usuario, 'inactivo')}
            />
          ) : (
            <ActionButton
              type='button'
              label='Dar de alta'
              icon={<ArrowUpIcon />}
              variant='success'
              disabled={isUpdating}
              isLoading={isUpdating}
              onClick={() => handleOpenModal(usuario, 'activo')}
            />
          )}

          <ActionButton
            label='Editar'
            icon={<EditIcon />}
            variant='info'
            to={`/usuarios/${usuario.idUsuario}/editar`}
          />
        </div>
      </div>
      {/* Modal de Confirmación de cambio de estado */}
      <ConfirmModal
        isOpen={isModalOpen}
        color={targetStatus === 'activo' ? 'green' : 'red'}
        entityName='usuario'
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </div>
  );
}

export default UsuarioDetalle;
