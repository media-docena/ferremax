import React, { useState, useEffect } from 'react';
import { Link, useLoaderData, useFetcher } from 'react-router';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import StatusBadge from '../../components/common/StatusBadge';
import ActionButton from '../../components/common/Buttons/ActionButton';
import DetailFieldTitle from '../../components/common/DetailFieldTitle';
import ConfirmModal from '../../components/common/ConfirmModal';
import AlertMessage from '../../components/common/AlertMessage';
import ArrowBackIcon from '../../assets/icons/arrow_back.svg?react';
import EditIcon from '../../assets/icons/edit.svg?react';
import DeleteIcon from '../../assets/icons/delete.svg?react';
import ArrowUpIcon from '../../assets/icons/arrow_upward.svg?react';

import {
  formatFechaArgentina,
  formatPrecio,
  capitalizeFirstLetter,
} from '../../helpers/productsHelper';

function ProductoDetalle() {
  const { producto, error } = useLoaderData();
  const fetcher = useFetcher();

  const breadcrumbItems = [
    { label: 'Inventario', href: '#' },
    { label: 'Detalle de producto' },
  ];

  // Estados del modal y alertas
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
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
    setSelectedProduct(product);
    setTargetStatus(newStatus);
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    if (selectedProduct && targetStatus) {
      fetcher.submit(
        { estado: targetStatus },
        {
          method: 'post',
          action: 'estado',
        }
      );
    }
    setIsModalOpen(false);
    setSelectedProduct(null);
    setTargetStatus(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setTargetStatus(null);
  };

  return (
    <div>
      <Breadcrumbs items={breadcrumbItems} />
      <div className='bg-white p-6 rounded-lg shadow-md'>
        <div className='flex justify-between items-center mb-8'>
          <h2 className='text-2xl font-bold text-gray-900'>
            Detalle de Producto
          </h2>
          <Link
            className='flex items-center text-sm text-amber-500 hover:text-amber-600 font-roboto font-medium'
            to='/productos'
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

        {/* First Section */}
        <div className='mb-6 pb-6 mt-6 pt-6 border-b border-t border-gray-200'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'>
            <DetailFieldTitle label='Código' value={producto.codigo} />
            <DetailFieldTitle label='Nombre' value={producto.nombre} />
          </div>
          <div className='mt-6'>
            <DetailFieldTitle
              label='Descripción'
              value={producto.descripcion || '-'}
            />
          </div>
        </div>

        {/* Second Section */}
        <div className='pt-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <DetailFieldTitle
              label='Precio'
              value={formatPrecio(producto.precio)}
            />
            <DetailFieldTitle
              label='Marca'
              value={producto.marca?.nombre || '-'}
            />
            <DetailFieldTitle
              label='Proveedor'
              value={producto.productoproveedor[0]?.proveedor?.nombre || '-'}
            />
            <DetailFieldTitle label='Stock' value={producto.stock} />
            <DetailFieldTitle label='Stock Mínimo' value={producto.stockMin} />
            <DetailFieldTitle
              label='Fecha de Vencimiento'
              value={formatFechaArgentina(producto.fechaVencimiento) || '-'}
            />
            <DetailFieldTitle
              label='Categoría'
              value={producto.categoria?.nombre || '-'}
            />
            <DetailFieldTitle
              label='Unidad del Producto'
              value={producto.productosunidad[0]?.unidad?.nombre || '-'}
            />
            <DetailFieldTitle
              label='Estado'
              statusBadge={
                <StatusBadge status={capitalizeFirstLetter(producto.estado)} />
              }
            />
            <DetailFieldTitle
              label='Fecha de Creación'
              value={formatFechaArgentina(producto.fechaCreacion, true)}
            />
            <DetailFieldTitle
              label='Fecha de Actualización'
              value={formatFechaArgentina(producto.fechaActualizacion, true)}
            />
          </div>
        </div>

        {/* Mensaje cuando no se ecuentra un usuario */}
        {(!producto || error?.status === 404) && (
          <div className='text-center py-12 text-gray-500'>
            Producto no encontrado
          </div>
        )}

        {/* Action Buttons */}
        <div className='mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-3'>
          {producto.estado === 'activo' ? (
            <ActionButton
              type='button'
              label='Dar de baja'
              icon={<DeleteIcon />}
              variant='danger'
              disabled={isUpdating}
              isLoading={isUpdating}
              onClick={() => handleOpenModal(producto, 'inactivo')}
            />
          ) : (
            <ActionButton
              type='button'
              label='Dar de alta'
              icon={<ArrowUpIcon />}
              variant='success'
              disabled={isUpdating}
              isLoading={isUpdating}
              onClick={() => handleOpenModal(producto, 'activo')}
            />
          )}

          <ActionButton
            label='Editar'
            icon={<EditIcon />}
            variant='info'
            to={`/productos/${producto.idProducto}/editar`}
          />
        </div>
      </div>
      {/* Modal de Confirmación de cambio de estado */}
      <ConfirmModal
        isOpen={isModalOpen}
        color={targetStatus === 'activo' ? 'green' : 'red'}
        entityName='producto'
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </div>
  );
}

export default ProductoDetalle;
