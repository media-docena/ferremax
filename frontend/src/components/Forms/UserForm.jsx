// components/forms/UserForm.jsx
import React, { useState } from 'react';
import { Link } from 'react-router';
import ActionButton from '../common/Buttons/ActionButton';
import SaveIcon from '../../assets/icons/save.svg?react';
import ArrowBackIcon from '../../assets/icons/arrow_back.svg?react';

function UserForm({
  initialData = {},
  mode = 'create',
  onSubmit,
  link,
}) {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    rol: '',
    correo: '',
    telefono: '',
    estado: 'activo', // Valor por defecto
    dni: '',
    direccion: '',
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
          {mode === 'edit' ? 'Editar Usuario' : 'Registrar Nuevo Usuario'}
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

      {/* FORMULARIO DE USUARIO */}
      <form onSubmit={handleSubmit}>
        {/* Row 1: Nombre y Apellido */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
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
              placeholder='Ej. Juan'
              value={formData.nombre}
              onChange={handleChange}
              className='w-full px-4 py-2 font-roboto border border-gray-200 rounded-md bg-gray-50
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent'
              required
            />
          </div>
          <div>
            <label
              htmlFor='apellido'
              className='block text-sm font-medium text-gray-500 mb-2'
            >
              Apellido <span className='text-red-500'>*</span>
            </label>
            <input
              id='apellido'
              type='text'
              name='apellido'
              placeholder='Ej. Pérez'
              value={formData.apellido}
              onChange={handleChange}
              className='w-full px-4 py-2 font-roboto border border-gray-200 rounded-md bg-gray-50
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent'
              required
            />
          </div>
        </div>

        {/* Row 2: Correo y Teléfono */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
          <div>
            <label
              htmlFor='correo'
              className='block text-sm font-medium text-gray-500 mb-2'
            >
              Correo Electrónico <span className='text-red-500'>*</span>
            </label>
            <input
              id='correo'
              type='email'
              name='correo'
              placeholder='ejemplo@dominio.com'
              value={formData.correo}
              onChange={handleChange}
              className='w-full px-4 py-2 font-roboto border border-gray-200 rounded-md bg-gray-50
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent'
              required
            />
          </div>
          <div>
            <label
              htmlFor='telefono'
              className='block text-sm font-medium text-gray-500 mb-2'
            >
              Teléfono
            </label>
            <input
              id='telefono'
              type='tel'
              name='telefono'
              placeholder='Ej. +54 9 11 1234 5678'
              value={formData.telefono}
              onChange={handleChange}
              className='w-full px-4 py-2 font-roboto border border-gray-200 rounded-md bg-gray-50
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent'
            />
          </div>
        </div>

        {/* Row 3: DNI, Rol, y Estado */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
          <div>
            <label
              htmlFor='dni'
              className='block text-sm font-medium text-gray-500 mb-2'
            >
              DNI <span className='text-red-500'>*</span>
            </label>
            <input
              id='dni'
              type='text'
              name='dni'
              placeholder='Ej. 12345678'
              value={formData.dni}
              onChange={handleChange}
              className='w-full px-4 py-2 font-roboto border border-gray-200 rounded-md bg-gray-50
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent'
              required
            />
          </div>
          <div>
            <label
              htmlFor='rol'
              className='block text-sm font-medium text-gray-500 mb-2'
            >
              Rol <span className='text-red-500'>*</span>
            </label>
            <select
              id='rol'
              name='rol'
              value={formData.rol}
              onChange={handleChange}
              className='w-full px-4 py-2 font-roboto border border-gray-200 rounded-md bg-gray-50
                         focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent'
              required
            >
              <option value='' hidden>Seleccione un rol</option>
              <option value='administrador'>Administrador</option>
              <option value='encargado'>Encargado</option>
              <option value='vendedor'>Vendedor</option>
            </select>
          </div>
          <div>
            <label
              htmlFor='estado'
              className='block text-sm font-medium text-gray-500 mb-2'
            >
              Estado <span className='text-red-500'>*</span>
            </label>
            <select
              id='estado'
              name='estado'
              value={formData.estado}
              onChange={handleChange}
              className='w-full px-4 py-2 font-roboto border border-gray-200 rounded-md bg-gray-50
                         focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent'
              required
            >
              <option value='activo'>Activo</option>
              <option value='inactivo'>Inactivo</option>
            </select>
          </div>
        </div>

        {/* Row 4: Dirección */}
        <div className='grid grid-cols-1 gap-6 mb-8'>
          <div>
            <label
              htmlFor='direccion'
              className='block text-sm font-medium text-gray-500 mb-2'
            >
              Dirección
            </label>
            <input
              id='direccion'
              name='direccion'
              placeholder='Calle, número, ciudad, código postal'
              value={formData.direccion}
              onChange={handleChange}
              rows='2'
              className='w-full px-4 py-2 font-roboto border border-gray-200 rounded-md bg-gray-50
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent'
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className='mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-3'>
          <ActionButton label='Cancelar' type='button' to={link} />
          <ActionButton
            label='Guardar Usuario'
            icon={<SaveIcon />}
            variant='success'
            type='submit'
          />
        </div>
      </form>
    </div>
  );
}

export default UserForm;