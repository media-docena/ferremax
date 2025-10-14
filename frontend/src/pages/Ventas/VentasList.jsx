import React, { useState } from 'react'
import ModalPago from './ModalPago'
import Breadcrumbs from '../../components/common/Breadcrumbs';
import SearchBar from '../../components/common/SearchBar';
import ActionButton from '../../components/common/Buttons/ActionButton';
import ActionIconButton from '../../components/common/Buttons/ActionIconButton';
import RemoveIcon from '../../assets/icons/remove.svg?react';
import AddIcon from '../../assets/icons/add.svg?react';
import DeleteIcon from '../../assets/icons/delete.svg?react';

function VentasList() {
  const breadcrumbItems = [
    { label: 'Ventas', href: '#' },
    { label: 'Carrito de Compras' },
  ]

  const products = [
    {
      id: '001',
      name: 'Martillo de uña',
      category: 'Herramientas Manuales',
      price: '$15.99',
      stock: 150,
    },
    {
      id: '002',
      name: 'Sellador de Silicona',
      category: 'Adhesivos y Selladores',
      price: '$8.99',
      stock: 35,
    },
    {
      id: '003',
      name: 'Pintura Látex Blanca',
      category: 'Pinturas',      
      price: '$25.00',
      stock: 50,      
    },
    {
      id: '004',
      name: 'Tornillos para madera',
      category: 'Fijaciones',
      price: '$5.75',
      stock: 0,
    },
    {
      id: '005',
      name: 'Taladro Inalámbrico',
      category: 'Herramientas Eléctricas',
      price: '$89.99',
      stock: 10,
    },
    {
      id: '006',
      name: 'Cinta métrica',
      category: 'Herramientas de Medición',
      price: '$9.20',
      stock: 120,
    },
  ];

  const productsInCart = [
    {
      id: '005',
      name: 'Taladro Inalámbrico',
      category: 'Herramientas Eléctricas',
      price: '$89.99',
      stock: 1,
    },
    {
      id: '006',
      name: 'Cinta métrica',
      category: 'Herramientas de Medición',
      price: '$9.20',
      stock: 1,
    }
  ];

  const getStockVariant = (stock) => {
    if (stock > 0) return 'addValid';
    else if (stock === 0) return 'addInvalid';
  };

  const [showModalPago, setShowModalPago] = useState(false);
  const handleOpenModalPago = () => setShowModalPago(true);
  const handleCloseModalPago = () => setShowModalPago(false);

  return (
    
    <div> {/* Contenedor Principal */}
      <Breadcrumbs items = {breadcrumbItems}/>
        <div className='flex flex-col lg:flex-row justify-center gap-6'> {/* Contenedor Secciones */}
          <div className='bg-white p-6 rounded-lg shadow-lg'> {/* Contenedor Lista de Productos */}
            <div className='justify-between items-center mb-6 flex-wrap gap-4'>
              <div className='flex justify-between items-center gap-4'>
                <div>
                  <h2 className='text-2xl font-bold text-gray-900 mb-5'>Listado de Productos</h2>
                </div>
                <div>
                  <SearchBar placeholder="Buscar producto..."/>
                </div>
              </div>
              <div className='overflow-x-auto'>
                <table className='w-full whitespace-nowrap'>
                  <thead className='text-left text-sm font-semibold text-gray-500 border-b border-gray-200'>
                    <tr>
                      <th className='p-4'>ID</th>
                      <th className='p-4'>Nombre</th>
                      <th className='p-4'>Categoría</th>
                      <th className='p-4'>Precio</th>
                      <th className='p-4'>Stock</th>
                      <th className='p-4 text-center'>Acciones</th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-200 text-sm'>
                    {products.map((product) => (
                      <tr>
                        <td className='p-4'>{product.id}</td>
                        <td className='p-4'>{product.name}</td>
                        <td className='p-4'>{product.category}</td>
                        <td className='p-4'>{product.price}</td>
                        <td className='p-4'>{product.stock}</td>
                        <td className='text-center p-4'> 
                          <ActionButton
                            label='Agregar'
                            variant={getStockVariant(product.stock)}
                            disabled={product.stock === 0}
                            onClick={() => console.log(`Agregar ${product.name} al carrito`)}
                          />
                        </td>
                      </tr> 
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <div className='bg-white p-6 rounded-lg shadow-lg w-full lg:w-1/3'> {/* Contenedor Carrito de Compras */}
            <h2 className='text-2xl font-bold text-gray-900 mb-5'>Carrito de Compras</h2>
            <div className='overflow-x-auto mb-6'>
              <table className='w-full whitespace-nowrap'> 
                    <tbody className='divide-y divide-gray-200 text-sm'>
                      {productsInCart.map((product) => (
                        <tr>
                          <td className='p-2'>
                            <div>
                              <p>{product.name}</p>
                              <p className='text-gray-600'>{product.price}</p>
                            </div>
                          </td>
                          <td className='p-2'>
                            <div className='justify-center items-center flex gap-2 wmax-w-[30px]'>
                              <ActionIconButton icon={<RemoveIcon/>}/>
                              <input type="text" className='w-10 text-center' defaultValue='1'/>
                              <ActionIconButton icon={<AddIcon/>}/>
                            </div>
                          </td>
                          <td>
                            <div className='p-2'>{product.price}</div>
                          </td>
                          <td>
                            <ActionIconButton icon={<DeleteIcon/>}/>
                          </td>
                        </tr>
                      ))}
                    </tbody>
              </table>
            </div>
            <div className='flex justify-between items-center text-gray-600 text-sm mb-2'>
              <p>Subtotal</p>
              <p>$99.19</p>
            </div>
            <div className='flex justify-between items-center font-bold text-lg mb-2'>
              <p>Total</p>
              <p>$99.19</p>
            </div>
            <div className='w-full'>
              <ActionButton
                label='Continuar a Forma de Pago'
                variant='continuePayment'
                onClick={handleOpenModalPago}
              />
              {showModalPago && (
                <ModalPago 
                  total={99.19}
                  onClose={handleCloseModalPago}
                />
              )}
            </div>
          </div>
        </div>
      </div>
  )
}

export default VentasList