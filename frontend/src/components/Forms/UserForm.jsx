// components/forms/UserForm.jsx
import React, { useState } from 'react';
import { Link, Form, useActionData, useNavigation } from 'react-router';
import { useRolData } from '../../hooks/useRolData';
import { capitalizeFirstLetter } from '../../helpers/utils';
import AlertMessage from '../common/AlertMessage';
import ActionButton from '../common/Buttons/ActionButton';
import SaveIcon from '../../assets/icons/save.svg?react';
import ArrowBackIcon from '../../assets/icons/arrow_back.svg?react';

function UserForm({ initialData = {}, mode = 'create' }) {
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const formData = actionData?.formData || initialData;

  const errors = actionData?.errors || {};
  const generalError = actionData?.error;

  // Estados para manejar el cambio de estilos en los selects
  const [selectedRol, setSelectedRol] = useState(formData.idRol || '');

  // Configuraciones de React Query
  const { data: formOptions, isLoading, error } = useRolData();


  if (isLoading) {
    return (
      <div className='flex items-center text-gray-600'>
        <div className='w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin mr-2'></div>
        <span>Cargando formulario...</span>
      </div>
    );
  }

  if (error) {
    return <div>Error cargando formulario: {error.message}</div>;
  }

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

      {/* Alerta de error general */}
      {generalError && (
        <AlertMessage type='error' message={generalError} duration={5000} />
      )}

      {/* FORMULARIO DE USUARIO */}
      <Form method='post'>
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
              defaultValue={formData.nombre || ''}
              className={`w-full px-4 py-2 font-roboto border rounded-md bg-gray-50
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400
                         ${
                           errors.nombre ? 'border-red-500' : 'border-gray-200'
                         }`}
              required
            />
            {errors.nombre && (
              <p className='mt-1 text-sm text-red-600'>{errors.nombre[0]}</p>
            )}
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
              defaultValue={formData.apellido || ''}
              className={`w-full px-4 py-2 font-roboto border rounded-md bg-gray-50
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400
                         ${
                           errors.apellido
                             ? 'border-red-500'
                             : 'border-gray-200'
                         }`}
              required
            />
            {errors.apellido && (
              <p className='mt-1 text-sm text-red-600'>{errors.apellido[0]}</p>
            )}
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
              defaultValue={formData.correo || ''}
              className={`w-full px-4 py-2 font-roboto border rounded-md bg-gray-50
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400
                         ${
                           errors.correo ? 'border-red-500' : 'border-gray-200'
                         }`}
              required
            />
            {errors.correo && (
              <p className='mt-1 text-sm text-red-600'>{errors.correo[0]}</p>
            )}
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
              defaultValue={formData.telefono || ''}
              className={`w-full px-4 py-2 font-roboto border rounded-md bg-gray-50
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400
                         ${
                           errors.telefono
                             ? 'border-red-500'
                             : 'border-gray-200'
                         }`}
            />
            {errors.telefono && (
              <p className='mt-1 text-sm text-red-600'>{errors.telefono[0]}</p>
            )}
          </div>
        </div>

        {/* Row 3: Contraseña  */}
        {mode === 'create' ? (
          <div className='grid grid-cols-1 gap-6 mb-6'>
            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-500 mb-2'
              >
                Contraseña <span className='text-red-500'>*</span>
              </label>
              <input
                id='password'
                type='password'
                name='password'
                placeholder='Mínimo 8 caracteres'
                className={`w-full px-4 py-2 font-roboto border rounded-md bg-gray-50
                           placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400
                           ${
                             errors.password
                               ? 'border-red-500'
                               : 'border-gray-200'
                           }`}
                required
              />
              {errors.password && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.password[0]}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className='grid grid-cols-1 gap-6 mb-6'>
            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-500 mb-2'
              >
                Nueva Contraseña (dejar vacío para mantener la actual)
              </label>
              <input
                id='password'
                type='password'
                name='password'
                placeholder='Mínimo 8 caracteres'
                className={`w-full px-4 py-2 font-roboto border rounded-md bg-gray-50
                           placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400
                           ${
                             errors.password
                               ? 'border-red-500'
                               : 'border-gray-200'
                           }`}
              />
              {errors.password && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.password[0]}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Row 4: DNI, Rol, y Estado */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
          {/* DNI Solo renderiza en modo creación */}
          {mode === 'create' && (
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
                defaultValue={formData.dni || ''}
                className={`w-full px-4 py-2 font-roboto border rounded-md bg-gray-50
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400
                         ${errors.dni ? 'border-red-500' : 'border-gray-200'}`}
                required
              />
              {errors.dni && (
                <p className='mt-1 text-sm text-red-600'>{errors.dni[0]}</p>
              )}
            </div>
          )}
          <div>
            <label
              htmlFor='idRol'
              className='block text-sm font-medium text-gray-500 mb-2'
            >
              Rol <span className='text-red-500'>*</span>
            </label>
            <select
              id='idRol'
              name='idRol'
              defaultValue={formData.idRol || ''}
              onChange={(e) => setSelectedRol(e.target.value)}
              className={`w-full px-4 py-2 font-roboto border rounded-md bg-gray-50
                         focus:outline-none focus:ring-2 focus:ring-amber-400
                         ${selectedRol ? 'text-gray-800' : 'text-gray-400'}
                         ${
                           errors.idRol ? 'border-red-500' : 'border-gray-200'
                         }`}
              required
            >
              <option value='' disabled hidden>
                Seleccione un rol
              </option>
              {formOptions?.roles?.data.map((rol) => (
                <option key={rol.idRol} value={rol.idRol}>
                  {capitalizeFirstLetter(rol.descripcion)}
                </option>
              ))}
            </select>
            {errors.idRol && (
              <p className='mt-1 text-sm text-red-600'>{errors.idRol[0]}</p>
            )}
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
              defaultValue={formData.estado || ''}
              className={`w-full px-4 py-2 font-roboto border rounded-md bg-gray-50
                         focus:outline-none focus:ring-2 focus:ring-amber-400
                         text-gray-800
                         ${
                           errors.estado ? 'border-red-500' : 'border-gray-200'
                         }`}
              required
            >
              <option value='activo'>Activo</option>
              <option value='inactivo'>Inactivo</option>
            </select>
            {errors.estado && (
              <p className='mt-1 text-sm text-red-600'>{errors.estado[0]}</p>
            )}
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
              placeholder='Calle, número, piso, departamento'
              defaultValue={formData.direccion || ''}
              rows='2'
              className={`w-full px-4 py-2 font-roboto border rounded-md bg-gray-50
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400
                         ${
                           errors.direccion
                             ? 'border-red-500'
                             : 'border-gray-200'
                         }`}
            />
            {errors.direccion && (
              <p className='mt-1 text-sm text-red-600'>{errors.direccion[0]}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className='mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-3'>
          <ActionButton
            label='Cancelar'
            type='button'
            to='/usuarios'
            disabled={isSubmitting}
          />
          <ActionButton
            label={isSubmitting ? 'Guardando...' : 'Guardar'}
            icon={<SaveIcon />}
            variant='success'
            type='submit'
            disabled={isSubmitting}
          />
        </div>
      </Form>
    </div>
  );
}

export default UserForm;
