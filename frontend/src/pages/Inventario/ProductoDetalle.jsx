import React from 'react'
import { Link } from 'react-router';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import StatusBadge from '../../components/common/StatusBadge';
import ActionButton from '../../components/common/Buttons/ActionButton'
import DetailFieldTitle from '../../components/common/DetailFieldTitle';
import ArrowBackIcon from '../../assets/icons/arrow_back.svg?react';
import EditIcon from '../../assets/icons/edit.svg?react';
import DeleteIcon from '../../assets/icons/delete.svg?react';

function ProductoDetalle() {
 const breadcrumbItems = [
   { label: 'Inventario', href: '#' },
   { label: 'Detalle de producto' },
 ];

 const productData = {
   id: '001',
   name: 'Martillo de uña',
   description:
     'Martillo de acero forjado con mango de fibra de vidrio ergonómico.',
   price: '$15.99',
   brand: 'Truper',
   supplier: 'Ferretería Central',
   stock: 150,
   minStock: 5,
   expiryDate: 'N/A',
   category: 'Herramientas Manuales',
   unit: 'Unidad',
   status: 'Activo',
   createdDate: '2023-01-10 09:30:15',
   updatedDate: '2023-10-26 14:05:40',
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

        {/* First Section */}
        <div className='mb-6 pb-6 border-b border-gray-200'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'>
            <DetailFieldTitle label='ID' value={productData.id} />
            <DetailFieldTitle label='Nombre' value={productData.name} />
          </div>
          <div className='mt-6'>
            <DetailFieldTitle
              label='Descripción'
              value={productData.description}
            />
          </div>
        </div>

        {/* Second Section */}
        <div className='pt-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <DetailFieldTitle label='Precio' value={productData.price} />
            <DetailFieldTitle label='Marca' value={productData.brand} />
            <DetailFieldTitle label='Proveedor' value={productData.supplier} />
            <DetailFieldTitle label='Stock' value={productData.stock} />
            <DetailFieldTitle
              label='Stock Mínimo'
              value={productData.minStock}
            />
            <DetailFieldTitle
              label='Fecha de Vencimiento'
              value={productData.expiryDate}
            />
            <DetailFieldTitle label='Categoría' value={productData.category} />
            <DetailFieldTitle
              label='Unidad del Producto'
              value={productData.unit}
            />
            <DetailFieldTitle label='Estado' statusBadge={
            <StatusBadge status={productData.status} />
            } />
            <DetailFieldTitle
              label='Fecha de Creación'
              value={productData.createdDate}
            />
            <DetailFieldTitle
              label='Fecha de Actualización'
              value={productData.updatedDate}
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

export default ProductoDetalle