import React, { useState, useEffect } from 'react';
import { useLoaderData, useFetcher, useSearchParams } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { productoService } from '../../api/services/productoService';
// Componentes
import Breadcrumbs from '../../components/common/Breadcrumbs';
import SearchBar from '../../components/common/SearchBar';
import ActionButton from '../../components/common/Buttons/ActionButton';
import StatusBadge from '../../components/common/StatusBadge';
import ActionIconButton from '../../components/common/Buttons/ActionIconButton';
import AlertMessage from '../../components/common/AlertMessage';
import ConfirmModal from '../../components/common/ConfirmModal';

// Helpers
import capitalizeFirstLetter from '../../helpers/utils';
import {
  getProductHighlight,
  formatFechaArgentina,
  formatPrecio,
  downloadFile,
} from '../../helpers/productsHelper';

// Iconos
import AddIcon from '../../assets/icons/add.svg?react';
import EditIcon from '../../assets/icons/edit.svg?react';
import DeleteIcon from '../../assets/icons/delete.svg?react';
import VisibilityIcon from '../../assets/icons/visibility.svg?react';
import ArrowUpwardIcon from '../../assets/icons/arrow_upward.svg?react';
import ArrowOutwardIcon from '../../assets/icons/arrow_outward.svg?react';
import ErrorIcon from '../../assets/icons/error.svg?react';
import WarningIcon from '../../assets/icons/warning.svg?react';
import NotificationImportantIcon from '../../assets/icons/notification_important.svg?react';
import logger from '../../../config/logger';

function ProductosList() {
  const { productos } = useLoaderData();
  const fetcher = useFetcher();
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const breadcrumbItems = [
    { label: 'Inventario', href: '#' },
    { label: 'Listado de productos' },
  ];

  // Estados del modal y alertas
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [targetStatus, setTargetStatus] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isExporting, setIsExporting] = useState(false);

  const canExport = user && ['admin', 'encargado'].includes(user.rol);

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

  const handleExportCSV = async () => {
    try {
      setIsExporting(true);
      const { blob, filename } = await productoService.exportToCSV();
      downloadFile(blob, filename);
      setSuccessMessage(`Archivo "${filename}" descargado exitosamente`);
    } catch (error) {
      logger.error('Error al exportar productos a CSV:', error);
      if (error.response?.status === 403) {
        setErrorMessage('No tenés permisos para exportar productos');
      } else {
        setErrorMessage(
          error.response?.data?.message || 'Error al exportar productos a CSV'
        );
      }
    } finally {
      setIsExporting(false);
    }
  };

  const getRowHighlight = (highlight) => {
    switch (highlight) {
      case 'expiring':
        return 'bg-orange-100';
      case 'out-of-stock':
        return 'bg-red-100';
      case 'low-stock':
        return 'bg-amber-100';
      default:
        return '';
    }
  };

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
          action: `${selectedProduct.idProducto}/estado`,
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

  // Handler para filtros
  const handleFilterChange = (filterName, value) => {
    setSearchParams((prevParams) => {
      // Crea una nueva instancia de URLSearchParams desde la anterior
      const newParams = new URLSearchParams(prevParams);

      if (value && value.trim() !== '') {
        newParams.set(filterName, value);
      } else {
        // Si no hay valor, lo eliminamos
        newParams.delete(filterName);
      }

      return newParams;
    });
  };

  const handleSearch = (searchTerm) => {
    handleFilterChange('search', searchTerm);
  };

  const handleClearFilters = () => {
    setSearchParams({});
  };

  return (
    <div>
      <Breadcrumbs items={breadcrumbItems} />
      <div className='bg-white p-6 rounded-lg shadow-lg'>
        <div className='flex justify-between items-center mb-6 flex-wrap gap-4'>
          <h2 className='text-2xl font-bold text-gray-900'>
            Listado de Productos
          </h2>
          <div className='flex items-center gap-4'>
            <SearchBar
              placeholder='Buscar producto...'
              onSearch={handleSearch}
              value={searchParams.get('search') || ''}
            />

            {/* Solo muestra el botón si tiene permisos */}
            {canExport && (
              <ActionButton
                type='button'
                label={isExporting ? 'Exportando...' : 'Exportar a CSV'}
                icon={isExporting ? null : <ArrowOutwardIcon />}
                variant='success'
                onClick={handleExportCSV}
                disabled={isExporting}
              />
            )}
            <ActionButton
              label='Nuevo Producto'
              icon={<AddIcon />}
              variant='warning'
              to='/productos/crear'
            />
          </div>
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

        {/* Muestra filtros activos */}
        {(searchParams.has('search') && (
          <div className='mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg'>
            <div className='flex items-center justify-between'>
              <div className='text-sm text-gray-700'>
                <strong>Filtros activos:</strong>
                {searchParams.has('search') &&
                  ` Búsqueda: "${searchParams.get('search')}"`}
              </div> 
              <button
                onClick={handleClearFilters}
                className='text-sm text-red-600 hover:text-red-800 font-medium transition-colors'
              >
                Limpiar filtros
              </button>
            </div>
          </div>
        ))}

        {/* Products List Table */}
        <div className='overflow-x-auto'>
          <table className='w-full whitespace-nowrap'>
            <thead className='text-left text-sm font-semibold text-gray-500 border-b border-gray-200'>
              <tr>
                <th className='p-4'>Código</th>
                <th className='p-4'>Nombre</th>
                <th className='p-4'>Descripción</th>
                <th className='p-4'>Precio</th>
                <th className='p-4'>Marca</th>
                <th className='p-4'>Proveedor</th>
                <th className='p-4'>Stock</th>
                <th className='p-4'>F. Vencimiento</th>
                <th className='p-4'>Categoría</th>
                <th className='p-4'>Estado</th>
                <th className='p-4 text-center'>Acciones</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200 text-sm'>
              {productos.map((producto) => {
                const highlight = getProductHighlight(producto);

                // Verificar si el producto esta siendo actualizado de estado
                const isUpdating =
                  fetcher.state === 'submitting' &&
                  fetcher.formAction?.includes(producto.idProducto.toString());

                return (
                  <tr
                    key={producto.idProducto}
                    className={`hover:bg-gray-100 ${getRowHighlight(
                      highlight
                    )} ${isUpdating ? 'opacity-50' : ''}`}
                  >
                    <td className='p-4 font-mono text-xs'>{producto.codigo}</td>
                    <td className='p-4 font-medium'>{producto.nombre}</td>
                    <td className='p-4 max-w-xs truncate'>
                      {producto.descripcion}
                    </td>
                    <td className='p-4 font-semibold'>
                      {formatPrecio(producto.precio)}
                    </td>
                    <td className='p-4'>{producto.marca?.nombre || '-'}</td>
                    <td className='p-4'>
                      {producto.productoproveedor?.[0]?.proveedor?.nombre ||
                        '-'}
                    </td>

                    <td className='p-4'>
                      {highlight === 'out-of-stock' ? (
                        <div className='flex items-center gap-2'>
                          <span className='text-red-600 font-bold'>0</span>
                          <span className='text-red-500' title='Agotado'>
                            <ErrorIcon className='w-5 h-5' />
                          </span>
                        </div>
                      ) : highlight === 'low-stock' ? (
                        <div className='flex items-center gap-2'>
                          <span className='text-amber-600 font-bold'>
                            {producto.stock}
                          </span>
                          <span className='text-amber-500' title='Stock bajo'>
                            <WarningIcon className='w-5 h-5' />
                          </span>
                        </div>
                      ) : (
                        <span className='font-medium'>{producto.stock}</span>
                      )}
                    </td>
                    {/* Columan donde se desarrolla la lógica de vencimiento si aplica */}
                    <td className='p-4'>
                      {highlight === 'expiring' ? (
                        <div className='flex items-center gap-2'>
                          <span className='text-orange-600 font-medium'>
                            {formatFechaArgentina(producto.fechaVencimiento)}
                          </span>
                          <span
                            className='text-orange-500'
                            title='Próximo a vencer'
                          >
                            <NotificationImportantIcon className='w-5 h-5' />
                          </span>
                        </div>
                      ) : (
                        <span className='text-gray-600'>
                          {formatFechaArgentina(producto.fechaVencimiento)}
                        </span>
                      )}
                    </td>

                    <td className='p-4'>{producto.categoria?.nombre || '-'}</td>
                    <td className='p-4'>
                      <StatusBadge
                        status={capitalizeFirstLetter(producto.estado)}
                      />
                    </td>

                    {/* Action Buttons Column */}
                    <td className='p-4 flex justify-center items-center space-x-2'>
                      <ActionIconButton
                        icon={<VisibilityIcon />}
                        variant='info'
                        to={producto.idProducto.toString()}
                      />
                      <ActionIconButton
                        icon={<EditIcon />}
                        variant='warning'
                        to={`${producto.idProducto}/editar`}
                      />

                      {/* Botón de acción de cambio de estado */}
                      {producto.estado === 'inactivo' ? (
                        <button
                          type='button'
                          onClick={() => handleOpenModal(producto, 'activo')}
                          disabled={isUpdating}
                          className='text-gray-500 hover:text-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                          title='Activar producto'
                        >
                          {isUpdating ? (
                            <div className='animate-spin h-5 w-5 border-2 border-gray-300 border-t-green-500 rounded-full' />
                          ) : (
                            <ArrowUpwardIcon className='w-5 h-5' />
                          )}
                        </button>
                      ) : (
                        <button
                          type='button'
                          onClick={() => handleOpenModal(producto, 'inactivo')}
                          disabled={isUpdating}
                          className='text-gray-500 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                          title='Dar de baja producto'
                        >
                          {isUpdating ? (
                            <div className='animate-spin h-5 w-5 border-2 border-gray-300 border-t-red-500 rounded-full' />
                          ) : (
                            <DeleteIcon className='w-5 h-5' />
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

        {/* Mensaje cuando no hay productos */}
        {(!productos || productos.length === 0 || productos.status === 404) && (
          <div className='text-center py-12 text-gray-500'>
            No se encontraron registros de productos
          </div>
        )}
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

export default ProductosList;
