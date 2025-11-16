import React, { useState } from 'react'
import ModalPago from './ModalPago'
import Breadcrumbs from '../../components/common/Breadcrumbs';
import SearchBar from '../../components/common/SearchBar';
import ActionButton from '../../components/common/Buttons/ActionButton';
import ActionIconButton from '../../components/common/Buttons/ActionIconButton';
import RemoveIcon from '../../assets/icons/remove.svg?react';
import AddIcon from '../../assets/icons/add.svg?react';
import DeleteIcon from '../../assets/icons/delete.svg?react';
import ModalVenta from './ModalVenta';
import { useLoaderData, useSearchParams } from 'react-router';
import { useCarrito } from '../../contexts/CarritoContext';
import { createVentaAction } from '../../api/actions/carritoVentaActions';

function VentasList() {
  const breadcrumbItems = [
    { label: 'Ventas', href: '#' },
    { label: 'Carrito de Compras' },
  ]

  const { productos: products = [], formaPago = [] } = useLoaderData();

  const { 
    carrito, 
    agregarProducto, 
    calcularTotal, 
    eliminarProducto, 
    actualizarCantidad, 
    incrementarCantidad,
    decrementarCantidad,
    limpiarCarrito,
  } = useCarrito();

  const userData = JSON.parse(localStorage.getItem('userSession') || '{}');
  const idEmpleado = userData.idEmpleado;

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (term) => {
    if (term) {
      setSearchParams({ search: term });
    } else {
      setSearchParams({});
    }
  };

  const existeEnCarrito = (idProducto) => 
    carrito.some((item) => item.idProducto === idProducto);
  
  const handleAgregar = (product) => {
    agregarProducto({
      idProducto: product.idProducto,
      codigo: product.codigo,
      nombre: product.nombre,
      categoria: product.categoria?.nombre || 'Sin categoria',
      precio: product.precio,
      stock: product.stock,
    });
  };

  const handleProcesarVenta = async (idFormaPago) => {
    try {
      if (carrito.length === 0) {
        alert('El carrito está vacío.');
        return null;
      }
      if (!idEmpleado) {
        alert('No se pudo obtener la información del empleado. Por favor, inicie sesión nuevamente.');
        return null;
      }

      const ventaData = {
        idEmpleado: idEmpleado,
        idFormaPago: idFormaPago,
        productos: carrito.map((item) => ({
          idProducto: item.idProducto,
          cantidad: item.cantidad,
          precio: Number(item.precio),
          subtotal: Number(item.subtotal),
        })),
      };

      console.log('Datos de venta a enviar:', ventaData);
      const response = await createVentaAction(ventaData);
      if (response.success) {
        limpiarCarrito();
        return response.data;
      }
    } catch (error) {
      console.error('Error al procesar la venta:', error);
      console.error('Detalle del error:', error.response?.data);
      alert('Ocurrió un error al procesar la venta. Por favor, intente nuevamente.');
      return null;
    }
  }
    
  const getStockVariant = (stock) => {
    if (stock > 0) return 'addValid';
    else if (stock === 0) return 'addInvalid';
  };

  const [showModalPago, setShowModalPago] = useState(false);
  const handleOpenModalPago = () => setShowModalPago(true);
  const handleCloseModalPago = () => setShowModalPago(false);

  const [showModalVenta, setShowModalVenta] = useState(false);
  const [ventaCreada, setVentaCreada] = useState(null); 
  const handleOpenModalVenta = () => setShowModalVenta(true);
  const handleCloseModalVenta = () => setShowModalVenta(false);

  const productsInCart = carrito;

  return (
    <div>
      {' '}
      {/* Contenedor Principal */}
      <Breadcrumbs items={breadcrumbItems} />
      <div className='flex flex-col lg:flex-row justify-center gap-6'>
        {' '}
        {/* Contenedor Secciones */}
        <div className='bg-white p-6 rounded-lg shadow-lg'>
          {' '}
          {/* Contenedor Lista de Productos */}
          <div className='justify-between items-center mb-6 flex-wrap gap-4'>
            <div className='flex justify-between items-center gap-4'>
              <div>
                <h2 className='text-2xl font-bold text-gray-900 mb-5'>
                  Listado de Productos
                </h2>
              </div>
              <div>
                <SearchBar
                  placeholder='Buscar producto...'
                  onSearch={handleSearch}
                  value={searchParams.get('search') || ''}
                />
              </div>
            </div>
            <div className='overflow-x-auto'>
              <table className='w-full whitespace-nowrap'>
                <thead className='text-left text-sm font-semibold text-gray-500 border-b border-gray-200'>
                  <tr>
                    <th className='p-4'>Código</th>
                    <th className='p-4'>Nombre</th>
                    <th className='p-4'>Categoría</th>
                    <th className='p-4'>Precio</th>
                    <th className='p-4'>Stock</th>
                    <th className='p-4 text-center'>Acciones</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 text-sm'>
                  {products.map((product) => {
                    const enCarrito = existeEnCarrito(product.idProducto);
                    const variant = getStockVariant(product.stock, enCarrito);
                    return (
                      <tr key={product.idProducto}>
                        <td className='p-4'>{product.codigo}</td>
                        <td className='p-4'>{product.nombre}</td>
                        <td className='p-4'>
                          {product.categoria?.nombre || 'Sin categoria'}
                        </td>
                        <td className='p-4'>
                          ${Number(product.precio).toLocaleString('es-AR')}
                        </td>
                        <td className='p-4'>{product.stock}</td>
                        <td className='text-center p-4'>
                          <ActionButton
                            label={
                              product.stock <= 0
                                ? 'Sin Stock'
                                : enCarrito
                                ? 'En carrito'
                                : 'Agregar'
                            }
                            variant={variant}
                            disabled={product.stock <= 0 || enCarrito}
                            onClick={() => handleAgregar(product)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan='6' className='p-4 text-center text-gray-500'>
                        No se encontraron productos.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className='bg-white p-6 rounded-lg shadow-lg w-full lg:w-1/3'>
          {' '}
          {/* Contenedor Carrito de Compras */}
          <h2 className='text-2xl font-bold text-gray-900 mb-5'>
            Carrito de Compras
          </h2>
          <div className='overflow-x-auto mb-6'>
            <table className='w-full whitespace-nowrap'>
              <tbody className='divide-y divide-gray-200 text-sm'>
                {productsInCart.map((product) => (
                  <tr>
                    <td className='p-2'>
                      <div>
                        <p>{product.nombre}</p>
                        <p className='text-gray-600'>
                          ${Number(product.precio).toLocaleString('es-AR')}
                        </p>
                      </div>
                    </td>
                    <td className='p-2'>
                      <div className='justify-center items-center flex gap-2 wmax-w-[30px]'>
                        <ActionIconButton
                          icon={<RemoveIcon />}
                          type='button'
                          onClick={() =>
                            decrementarCantidad(product.idProducto)
                          }
                        />
                        <input
                          type='text'
                          className='w-10 text-center'
                          defaultValue='1'
                          value={product.cantidad}
                          onChange={(e) =>
                            actualizarCantidad(
                              product.idProducto,
                              parseInt(e.target.value) || 1
                            )
                          }
                        />
                        <ActionIconButton
                          icon={<AddIcon />}
                          type='button'
                          onClick={() =>
                            incrementarCantidad(product.idProducto)
                          }
                        />
                      </div>
                    </td>
                    <td>
                      <div className='p-2'>
                        ${Number(product.subtotal).toLocaleString('es-AR')}
                      </div>
                    </td>
                    <td>
                      <ActionIconButton
                        icon={<DeleteIcon />}
                        type='button'
                        onClick={() => eliminarProducto(product.idProducto)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='flex justify-between items-center text-gray-600 text-sm mb-2'>
            <p>Subtotal</p>
            <p>${Number(calcularTotal()).toLocaleString('es-AR')}</p>
          </div>
          <div className='flex justify-between items-center font-bold text-lg mb-2'>
            <p>Total</p>
            <p>${Number(calcularTotal()).toLocaleString('es-AR')}</p>
          </div>
          <div className='w-full'>
            <ActionButton
              label='Continuar a Forma de Pago'
              variant='continuePayment'
              onClick={handleOpenModalPago}
              disabled={carrito.length === 0}
            />
            {showModalPago && (
              <ModalPago
                total={calcularTotal()}
                formaPago={formaPago}
                onClose={handleCloseModalPago}
                onOpen={async (idFormaPago) => {
                  const venta = await handleProcesarVenta(idFormaPago);
                  if (venta) {
                    setVentaCreada(venta);
                    handleCloseModalPago();
                    handleOpenModalVenta();
                  }
                }}
              />
            )}
            {showModalVenta && ventaCreada && (
              <ModalVenta venta={ventaCreada} onClose={handleCloseModalVenta} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VentasList