import React from 'react'
//import { useState } from 'react';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import SearchBar from '../../components/common/SearchBar';
import ActionButton from '../../components/common/Buttons/ActionButton';
import StatusBadge from '../../components/common/StatusBadge';
import ActionIconButton from '../../components/common/Buttons/ActionIconButton';
import AddIcon from '../../assets/icons/add.svg?react';
import EditIcon from '../../assets/icons/edit.svg?react';
import DeleteIcon from '../../assets/icons/delete.svg?react';
import VisibilityIcon from '../../assets/icons/visibility.svg?react';
import ArrowUpwardIcon from '../../assets/icons/arrow_upward.svg?react';
import ArrowOutwardIcon from '../../assets/icons/arrow_outward.svg?react';
import ErrorIcon from '../../assets/icons/error.svg?react';
import WarningIcon from '../../assets/icons/warning.svg?react';
import NotificationImportantIcon from '../../assets/icons/notification_important.svg?react';


function ProductosList() {
  //const [searchTerm, setSearchTerm] = useState('');


  const breadcrumbItems = [
    { label: 'Inventario', href: '#' },
    { label: 'Listado de productos' },
  ];

  const products = [
    {
      id: '001',
      name: 'Martillo de uña',
      description: 'Martillo de acero forjado con mango de fibra de vidrio.',
      price: '$15.99',
      brand: 'Truper',
      supplier: 'Ferretería Central',
      stock: 150,
      expiryDate: 'N/A',
      category: 'Herramientas Manuales',
      status: 'Activo',
      highlight: null,
    },
    {
      id: '002',
      name: 'Sellador de Silicona',
      description: 'Tubo de sellador de silicona transparente anti-hongos.',
      price: '$8.99',
      brand: 'Sista',
      supplier: 'Proveedor Industrial',
      stock: 35,
      expiryDate: '2024-08-15',
      category: 'Adhesivos y Selladores',
      status: 'Activo',
      highlight: 'expiring',
    },
    {
      id: '003',
      name: 'Pintura Látex Blanca',
      description: 'Lata de 1 galón de pintura blanca para interiores.',
      price: '$25.00',
      brand: 'Behr',
      supplier: 'Pinturas Modernas',
      stock: 50,
      expiryDate: '2025-12-31',
      category: 'Pinturas',
      status: 'Inactivo',
      highlight: null,
    },
    {
      id: '004',
      name: 'Tornillos para madera',
      description: 'Caja de 100 tornillos de 1 pulgada.',
      price: '$5.75',
      brand: 'Genérico',
      supplier: 'Ferretería Central',
      stock: 0,
      expiryDate: 'N/A',
      category: 'Fijaciones',
      status: 'Agotado',
      highlight: 'out-of-stock',
    },
    {
      id: '005',
      name: 'Taladro Inalámbrico',
      description: 'Taladro de 18V con batería de litio y cargador.',
      price: '$89.99',
      brand: 'DeWalt',
      supplier: 'Herramientas PRO',
      stock: 10,
      expiryDate: 'N/A',
      category: 'Herramientas Eléctricas',
      status: 'Activo',
      highlight: 'low-stock',
    },
    {
      id: '006',
      name: 'Cinta métrica',
      description: 'Cinta métrica de 5 metros con carcasa de goma.',
      price: '$9.20',
      brand: 'Stanley',
      supplier: 'Proveedor Industrial',
      stock: 120,
      expiryDate: 'N/A',
      category: 'Herramientas de Medición',
      status: 'Activo',
      highlight: null,
    },
  ];

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
              //onSearch={setSearchTerm}
            />
            <ActionButton
              label='Exportar a CSV'
              icon={<ArrowOutwardIcon />}
              variant='success'
              onClick={() => console.log('Exportar a CSV')}
            />
            <ActionButton
              label='Nuevo Producto'
              icon={<AddIcon />}
              variant='warning'
              onClick={() => console.log('Nuevo producto')}
            />
          </div>
        </div>

        {/* Products List Table */}
        <div className='overflow-x-auto'>
          <table className='w-full whitespace-nowrap'>
            <thead className='text-left text-sm font-semibold text-gray-500 border-b border-gray-200'>
              <tr>
                <th className='p-4'>ID</th>
                <th className='p-4'>Nombre</th>
                <th className='p-4'>Descripción</th>
                <th className='p-4'>Precio</th>
                <th className='p-4'>Marca</th>
                <th className='p-4'>Proveedor</th>
                <th className='p-4'>Stock</th>
                <th className='p-4'>Fecha de Vencimiento</th>
                <th className='p-4'>Categoría</th>
                <th className='p-4'>Estado</th>
                <th className='p-4 text-center'>Acciones</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200 text-sm'>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className={`hover:bg-gray-100 ${getRowHighlight(
                    product.highlight
                  )}`}
                >
                  <td className='p-4'>{product.id}</td>
                  <td className='p-4'>{product.name}</td>
                  <td className='p-4 max-w-xs truncate'>
                    {product.description}
                  </td>
                  <td className='p-4'>{product.price}</td>
                  <td className='p-4'>{product.brand}</td>
                  <td className='p-4'>{product.supplier}</td>
                  <td className='p-4'>
                    {product.highlight === 'out-of-stock' ? (
                      <div className='flex items-center gap-2'>
                        <span className='text-red-600 font-bold'>0</span>
                        <span className='text-red-500' title='Agotado'>
                          <ErrorIcon />
                        </span>
                      </div>
                    ) : product.highlight === 'low-stock' ? (
                      <div className='flex items-center gap-2'>
                        <span className='text-amber-600 font-bold'>
                          {product.stock}
                        </span>
                        <span className='text-amber-500' title='Stock bajo'>
                          <WarningIcon />
                        </span>
                      </div>
                    ) : (
                      product.stock
                    )}
                  </td>
                  <td className='p-4'>
                    {product.highlight === 'expiring' ? (
                      <div className='flex items-center gap-2'>
                        <span className='text-orange-500'>
                          {product.expiryDate}
                        </span>
                        <span
                          className='text-orange-500'
                          title='Próximo a vencer'
                        >
                          <NotificationImportantIcon />
                        </span>
                      </div>
                    ) : (
                      product.expiryDate
                    )}
                  </td>
                  <td className='p-4'>{product.category}</td>
                  <td className='p-4'>
                    <StatusBadge status={product.status} />
                  </td>
                  {/* Action Buttons Column */}
                  <td className='p-4 flex justify-center items-center space-x-2'>
                    <ActionIconButton icon={<VisibilityIcon />} variant='info' to={product.id} />
                    <button className='text-gray-500 hover:text-yellow-500'>
                      <EditIcon />
                    </button>
                    {product.status === 'Inactivo' ? (
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
};


export default ProductosList