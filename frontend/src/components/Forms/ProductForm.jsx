// components/forms/ProductForm.jsx
import React, { useState } from 'react';
import { Link } from 'react-router';
import ActionButton from '../common/Buttons/ActionButton';
import SaveIcon from '../../assets/icons/save.svg?react';
import ArrowBackIcon from '../../assets/icons/arrow_back.svg?react';

function ProductForm({
  initialData = {},
  mode = 'create',
  onSubmit,
  link
}) {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    marca: '',
    proveedor: '',
    stock: '',
    minStock: '',
    fechaDeVencimiento: '',
    categoria: '',
    unidad: '',
    ...initialData, // Sobrescribe si se pasan valores iniciales (modo edición)
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
    onSubmit(formData);
  };

  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-bold text-gray-900'>
          {mode === 'edit' ? 'Editar Producto' : 'Registrar Nuevo Producto'}
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

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        {/* Row 1: Nombre y Descripción */}
        <div className='grid grid-cols-1 gap-6 mb-6'>
          <div>
            <label
              htmlFor='nombre'
              className='block text-sm font-medium text-gray-500 mb-2'
            >
              Nombre <span className='text-red-500'>*</span>
            </label>
            <input
              id='nombre'
              type='text'
              name='nombre'
              placeholder='Ej. Martillo de uña'
              value={formData.nombre}
              onChange={handleChange}
              className='w-full px-4 py-2 font-roboto border border-gray-200 rounded-md bg-gray-50
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent'
              required
            />
          </div>
          <div>
            <label
              htmlFor='descripcion'
              className='block text-sm font-medium text-gray-500 mb-2'
            >
              Descripción
            </label>
            <textarea
              id='descripcion'
              name='descripcion'
              placeholder='Breve descripción del producto'
              value={formData.descripcion}
              onChange={handleChange}
              rows='3'
              className='w-full px-4 py-2 font-roboto border border-gray-200 rounded-md bg-gray-50
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent'
            />
          </div>
        </div>

        {/* Row 2: Precio, Marca, Proveedor */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
          <div>
            <label
              htmlFor='precio'
              className='block text-sm font-medium text-gray-500 mb-2'
            >
              Precio <span className='text-red-500'>*</span>
            </label>
            <div className='relative'>
              <span className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-500'>
                $
              </span>
              <input
                id='precio'
                type='text'
                name='precio'
                placeholder='0.00'
                value={formData.precio}
                onChange={handleChange}
                className='w-full pl-8 pr-4 py-2 font-roboto border border-gray-200 rounded-md bg-gray-50
                           placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent'
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor='marca'
              className='block text-sm font-medium text-gray-500 mb-2'
            >
              Marca
            </label>
            <select
              id='marca'
              name='marca'
              value={formData.marca}
              onChange={handleChange}
              className={`w-full px-4 py-2 font-roboto border border-gray-200 rounded-md bg-gray-50
                         placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent
                        ${!formData.marca ? 'text-gray-400' : 'text-gray-800'}`}
            >
              <option value='' disabled hidden>
                Seleccionar una marca
              </option>
              <option value={'Stanley'}>Stanley</option>
              <option value={'Trupper'}>Truper</option>
              <option value={'DeWalt'}>DeWalt</option>
            </select>
          </div>
          <div>
            <label
              htmlFor='proveedor'
              className='block text-sm font-medium text-gray-500 mb-2'
            >
              Proveedor
            </label>
            <select
              id='proveedor'
              name='proveedor'
              value={formData.proveedor}
              onChange={handleChange}
              className={`w-full px-4 py-2 font-roboto border border-gray-200 rounded-md bg-gray-50
                         focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent
                         ${
                           !formData.proveedor
                             ? 'text-gray-400'
                             : 'text-gray-800'
                         }`}
            >
              <option value='' disabled hidden>
                Seleccionar un proveedor
              </option>
              <option value={'Ferretería Central'}>Ferretería Central</option>
              <option value={'Proveedor Industrial SA'}>
                Proveedor Industrial SA
              </option>
              <option value={'Herramientas del Norte'}>
                Herramientas del Norte
              </option>
            </select>
          </div>
        </div>

        {/* Row 3: Stock, Stock mínimo, Vencimiento */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
          <div>
            <label
              htmlFor='stock'
              className='block text-sm font-medium text-gray-500 mb-2'
            >
              Stock
            </label>
            <input
              id='stock'
              type='number'
              name='stock'
              placeholder='0'
              value={formData.stock}
              onChange={handleChange}
              className='w-full px-4 py-2 font-roboto border border-gray-200 rounded-md bg-gray-50
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent'
            />
          </div>
          <div>
            <label
              htmlFor='minStock'
              className='block text-sm font-medium text-gray-500 mb-2'
            >
              Stock Mínimo
            </label>
            <input
              id='minStock'
              type='number'
              name='minStock'
              min={5}
              placeholder='5'
              value={formData.minStock}
              onChange={handleChange}
              className='w-full px-4 py-2 font-roboto border border-gray-200 rounded-md bg-gray-50
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent'
            />
          </div>
          <div>
            <label
              htmlFor='fechaDeVencimiento'
              className='block text-sm font-medium text-gray-500 mb-2'
            >
              Fecha de Vencimiento
            </label>
            <input
              id='fechaDeVencimiento'
              type='date'
              name='fechaDeVencimiento'
              value={formData.fechaDeVencimiento}
              onChange={handleChange}
              className={`w-full px-4 py-2 font-roboto border border-gray-200 rounded-md bg-gray-50
                         focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent
                         ${
                           !formData.fechaDeVencimiento
                             ? 'text-gray-400'
                             : 'text-gray-800'
                         }`}
            />
          </div>
        </div>

        {/* Row 4: Categoría y Unidad */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <div>
            <label
              htmlFor='categoria'
              className='block text-sm font-medium text-gray-500 mb-2'
            >
              Categoría
            </label>
            <select
              id='categoria'
              name='categoria'
              value={formData.categoria}
              onChange={handleChange}
              className={`w-full px-4 py-2 font-roboto border border-gray-200 rounded-md bg-gray-50
                         focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent
                         ${
                           !formData.categoria
                             ? 'text-gray-400'
                             : 'text-gray-800'
                         }`}
            >
              <option value={''} disabled hidden>
                Seleccionar una categoría
              </option>
              <option>Herramientas Eléctricas</option>
              <option>Herramientas Manuales</option>
              <option>Plomería</option>
            </select>
          </div>
          <div>
            <label
              htmlFor='unidad'
              className='block text-sm font-medium text-gray-500 mb-2'
            >
              Unidad
            </label>
            <select
              id='unidad'
              name='unidad'
              value={formData.unidad}
              onChange={handleChange}
              className={`w-full px-4 py-2 font-roboto border border-gray-200 rounded-md bg-gray-50
                         focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent
                         ${
                           !formData.unidad
                             ? 'text-gray-400'
                             : 'text-gray-800'
                         }`}
            >
              <option value={''} disabled hidden>Seleccionar unidad</option>
              <option value={'Unidad'}>Unidad</option>
              <option value={'Caja'}>Caja</option>
              <option value={'Metro'}>Metro</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-3'>
          <ActionButton label='Cancelar' type='button' to={link} />
          <ActionButton
            label='Guardar'
            icon={<SaveIcon />}
            variant='success'
            type='submit'
          />
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
