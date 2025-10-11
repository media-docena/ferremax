import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import ActionButton from '../../components/common/Buttons/ActionButton';
import ArrowBackIcon from '../../assets/icons/arrow_back.svg?react';
import SaveIcon from '../../assets/icons/save.svg?react';

function ProductoCrear() {
  const [formData, setFormData] = useState({
    name: 'Nombre del Producto',
    description: 'Descripción del Producto',
    price: '0.00',
    brand: 'Truper',
    supplier: 'Ferretería Central',
    stock: '0',
    minStock: '5',
    expiryDate: 'dd/mm/aaaa',
    category: 'Herramientas Manuales',
    unit: 'Unidad',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario guardado:', formData);
  };

  const handleCancel = () => {
    console.log('Edición cancelada');
  };

  const breadcrumbItems = [
    { label: 'Inventario', href: '#' },
    { label: 'Registro de producto' },
  ];

  return (
    <div>
      <Breadcrumbs items={breadcrumbItems} />
      <div className='bg-white p-6 rounded-lg shadow-md'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold text-gray-900'>Registrar Nuevo Producto</h2>
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
        {/* Form */}
        <div>
          {/* Row 1: Nombre y Descripción */}
          <div className='grid grid-cols-1 md:grid-cols-1 gap-6 mb-6'>
            <div>
              <label className='block text-sm font-roboto font-medium text-gray-500 mb-2'>
                Nombre
              </label>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                className='w-full px-4 py-2 font-roboto border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent'
              />
            </div>
            <div className='md:col-span-1'>
              <label className='block text-sm font-roboto font-medium text-gray-500 mb-2'>
                Descripción
              </label>
              <textarea
                name='description'
                value={formData.description}
                onChange={handleChange}
                rows='3'
                className='w-full px-4 py-2 font-roboto border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent'
              />
            </div>
          </div>

          {/* Row 2: Precio, Marca, Proveedor */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
            <div>
              <label className='block text-sm font-roboto font-medium text-gray-500 mb-2'>
                Precio
              </label>
              <div className='relative'>
                <span className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-500'>
                  $
                </span>
                <input
                  type='text'
                  name='price'
                  value={formData.price}
                  onChange={handleChange}
                  className='w-full pl-8 pr-4 py-2 font-roboto border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent'
                />
              </div>
            </div>
            <div>
              <label className='block text-sm font-roboto font-medium text-gray-500 mb-2'>
                Marca
              </label>
              <select
                name='brand'
                value={formData.brand}
                onChange={handleChange}
                className='w-full px-4 py-2 border border-gray-200 font-roboto rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent'
              >
                <option>Stanley</option>
                <option>Truper</option>
                <option>DeWalt</option>
              </select>
            </div>
            <div>
              <label className='block text-sm font-roboto font-medium text-gray-500 mb-2'>
                Proveedor
              </label>
              <select
                name='supplier'
                value={formData.supplier}
                onChange={handleChange}
                className='w-full px-4 py-2 font-roboto border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent'
              >
                <option>Ferretería Central</option>
                <option>Proveedor Industrial SA</option>
                <option>Herramientas del Norte</option>
              </select>
            </div>
          </div>

          {/* Row 3: Stock, Stock Mínimo, Fecha Vencimiento */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
            <div>
              <label className='block text-sm font-roboto font-medium text-gray-500 mb-2'>
                Stock
              </label>
              <input
                type='number'
                name='stock'
                value={formData.stock}
                onChange={handleChange}
                className='w-full px-4 py-2 font-roboto border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent'
              />
            </div>
            <div>
              <label className='block text-sm font-roboto font-medium text-gray-500 mb-2'>
                Stock Mínimo
              </label>
              <input
                type='number'
                min={5}
                name='minStock'
                value={formData.minStock}
                onChange={handleChange}
                className='w-full px-4 py-2 font-roboto border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent'
              />
            </div>
            <div>
              <label className='block text-sm font-roboto font-medium text-gray-500 mb-2'>
                Fecha de Vencimiento
              </label>
              <input
                type='date'
                name='expiryDate'
                value={formData.expiryDate}
                onChange={handleChange}
                className='w-full px-4 py-2 font-roboto border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent'
              />
            </div>
          </div>

          {/* Row 4: Categoría y Unidad */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
            <div>
              <label className='block text-sm font-roboto font-medium text-gray-500 mb-2'>
                Categoría
              </label>
              <select
                name='category'
                value={formData.category}
                onChange={handleChange}
                className='w-full px-4 py-2 font-roboto border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent'
              >
                <option>Herramientas Eléctricas</option>
                <option>Herramientas Manuales</option>
                <option>Plomería</option>
              </select>
            </div>
            <div>
              <label className='block text-sm font-roboto font-medium text-gray-500 mb-2'>
                Unidad del Producto
              </label>
              <select
                name='unit'
                value={formData.unit}
                onChange={handleChange}
                className='w-full px-4 py-2 font-roboto border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent'
              >
                <option>Unidad</option>
                <option>Caja</option>
                <option>Metro</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-3'>
            <ActionButton
              label='Cancelar'
              type='button'
              onClick={handleCancel}
            />
            <ActionButton
              label='Guardar'
              icon={<SaveIcon />}
              variant='success'
              type='button'
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductoCrear;
