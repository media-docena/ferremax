// components/forms/ProductForm.jsx
import React, { useState } from 'react';
import { Link, Form, useActionData, useNavigation } from 'react-router';
import { useFormData } from '../../hooks/useFormData';
import AlertMessage from '../common/AlertMessage';
import ActionButton from '../common/Buttons/ActionButton';
import SaveIcon from '../../assets/icons/save.svg?react';
import ArrowBackIcon from '../../assets/icons/arrow_back.svg?react';

function ProductForm({ initialData = {}, mode = 'create' }) {
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const formData = actionData?.formData || initialData;

  const errors = actionData?.errors || {};
  const generalError = actionData?.error;

  // Estados para manejar el cambio de estilos en los selects
  const [selectedMarca, setSelectedMarca] = useState(formData.idMarca || '');
  const [selectedProveedor, setSelectedProveedor] = useState(
    formData.idProveedor || ''
  );
  const [selectedCategoria, setSelectedCategoria] = useState(
    formData.idCategoria || ''
  );
  const [selectedUnidad, setSelectedUnidad] = useState(formData.idUnidad || '');
  const [selectedFVencimiento, setSelectedFVencimiento] = useState(
    formData.fechaVencimiento || ''
  );

  // Configuraciones de React Query
  const { data: formOptions, isLoading, error } = useFormData();
  console.log(errors);
  console.log(generalError);

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
      <div className='flex justify-between items-center mb-6 border-b pb-6  text-gray-200'>
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

      {/* Alerta de error general */}
      {generalError && (
        <AlertMessage type='error' message={generalError} duration={5000} />
      )}

      {/* FORM */}
      <Form method='post'>
        {/* Row 1: Código */}
        {mode === 'create' && (
          <div className='mb-6'>
            <label
              htmlFor='codigo'
              className='block text-sm font-medium text-gray-500 mb-2'
            >
              Código de Barras <span className='text-red-500'>*</span>
            </label>
            <input
              id='codigo'
              type='text'
              name='codigo'
              placeholder='Ej. 7798116930783'
              defaultValue={formData.codigo || ''}
              className={`w-full px-4 py-2 font-roboto border rounded-md bg-gray-50
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400
                         ${
                           errors.codigo ? 'border-red-500' : 'border-gray-200'
                         }`}
              required
            />
            {errors.codigo && (
              <p className='mt-1 text-sm text-red-600'>{errors.codigo[0]}</p>
            )}
          </div>
        )}

        {/* Row 2: Nombre y Descripción  */}
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
              htmlFor='descripcion'
              className='block text-sm font-medium text-gray-500 mb-2'
            >
              Descripción
            </label>
            <textarea
              id='descripcion'
              name='descripcion'
              placeholder='Breve descripción del producto'
              defaultValue={formData.descripcion || ''}
              rows='3'
              className={`w-full px-4 py-2 font-roboto border rounded-md bg-gray-50
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400
                         ${
                           errors.descripcion
                             ? 'border-red-500'
                             : 'border-gray-200'
                         }`}
            />
            {errors.descripcion && (
              <p className='mt-1 text-sm text-red-600'>
                {errors.descripcion[0]}
              </p>
            )}
          </div>
        </div>

        {/* Row 3: Precio, Marca, Proveedor */}
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
                defaultValue={formData.precio || ''}
                className={`w-full pl-8 pr-4 py-2 font-roboto border rounded-md bg-gray-50
                           placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400
                           ${
                             errors.precio
                               ? 'border-red-500'
                               : 'border-gray-200'
                           }`}
                required
              />
            </div>
            {errors.precio && (
              <p className='mt-1 text-sm text-red-600'>{errors.precio[0]}</p>
            )}
          </div>
          <div>
            <label
              htmlFor='idMarca'
              className='block text-sm font-medium text-gray-500 mb-2'
            >
              Marca
            </label>
            <select
              id='idMarca'
              name='idMarca'
              defaultValue={formData.idMarca || ''}
              onChange={(e) => setSelectedMarca(e.target.value)}
              className={`w-full px-4 py-2 font-roboto border rounded-md bg-gray-50
                         focus:outline-none focus:ring-2 focus:ring-amber-400 
                        ${selectedMarca ? 'text-gray-800' : 'text-gray-400'}
                         ${
                           errors.idMarca ? 'border-red-500' : 'border-gray-200'
                         }`}
            >
              <option value='' disabled hidden>
                Seleccionar una marca
              </option>
              {formOptions?.marcas?.map((marca) => (
                <option key={marca.idMarca} value={marca.idMarca}>
                  {marca.nombre}
                </option>
              ))}
            </select>
            {errors.idMarca && (
              <p className='mt-1 text-sm text-red-600'>{errors.idMarca[0]}</p>
            )}
          </div>
          <div>
            <label
              htmlFor='idProveedor'
              className='block text-sm font-medium text-gray-500 mb-2'
            >
              Proveedor
            </label>
            <select
              id='idProveedor'
              name='idProveedor'
              defaultValue={formData.idProveedor || ''}
              onChange={(e) => setSelectedProveedor(e.target.value)}
              className={`w-full px-4 py-2 font-roboto border rounded-md bg-gray-50
                         focus:outline-none focus:ring-2 focus:ring-amber-400
                         ${
                           selectedProveedor ? 'text-gray-800' : 'text-gray-400'
                         }
                         ${
                           errors.idProveedor
                             ? 'border-red-500'
                             : 'border-gray-200'
                         }`}
            >
              <option value='' disabled hidden>
                Seleccionar un proveedor
              </option>
              {formOptions?.proveedores?.map((proveedor) => (
                <option
                  key={proveedor.idProveedor}
                  value={proveedor.idProveedor}
                >
                  {proveedor.nombre}
                </option>
              ))}
            </select>
            {errors.idProveedor && (
              <p className='mt-1 text-sm text-red-600'>
                {errors.idProveedor[0]}
              </p>
            )}
          </div>
        </div>

        {/* Row 4: Stock, Stock mínimo, Vencimiento */}
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
              defaultValue={formData.stock || ''}
              className={`w-full px-4 py-2 font-roboto border rounded-md bg-gray-50
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400
                         ${
                           errors.stock ? 'border-red-500' : 'border-gray-200'
                         }`}
            />
            {errors.stock && (
              <p className='mt-1 text-sm text-red-600'>{errors.stock[0]}</p>
            )}
          </div>
          <div>
            <label
              htmlFor='stockMin'
              className='block text-sm font-medium text-gray-500 mb-2'
            >
              Stock Mínimo
            </label>
            <input
              id='stockMin'
              type='number'
              name='stockMin'
              min={5}
              placeholder='5'
              defaultValue={formData.stockMin || ''}
              className={`w-full px-4 py-2 font-roboto border rounded-md bg-gray-50
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400
                         ${
                           errors.stockMin
                             ? 'border-red-500'
                             : 'border-gray-200'
                         }`}
            />
            {errors.stockMin && (
              <p className='mt-1 text-sm text-red-600'>{errors.stockMin[0]}</p>
            )}
          </div>
          <div>
            <label
              htmlFor='fechaVencimiento'
              className='block text-sm font-medium text-gray-500 mb-2'
            >
              Fecha de Vencimiento
            </label>
            <input
              id='fechaVencimiento'
              type='date'
              name='fechaVencimiento'
              defaultValue={formData.fechaVencimiento || ''}
              onChange={(e) => setSelectedFVencimiento(e.target.value)}
              className={`w-full px-4 py-2 font-roboto border rounded-md bg-gray-50
                         focus:outline-none focus:ring-2 focus:ring-amber-400
                         ${
                           selectedFVencimiento
                             ? 'text-gray-800'
                             : 'text-gray-400'
                         }
                         ${
                           errors.fechaVencimiento
                             ? 'border-red-500'
                             : 'border-gray-200'
                         }`}
            />
            {errors.fechaVencimiento && (
              <p className='mt-1 text-sm text-red-600'>
                {errors.fechaVencimiento[0]}
              </p>
            )}
          </div>
        </div>

        {/* Row 5: Categoría y Unidad */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <div>
            <label
              htmlFor='idCategoria'
              className='block text-sm font-medium text-gray-500 mb-2'
            >
              Categoría
            </label>
            <select
              id='idCategoria'
              name='idCategoria'
              defaultValue={formData.idCategoria || ''}
              onChange={(e) => setSelectedCategoria(e.target.value)}
              className={`w-full px-4 py-2 font-roboto border rounded-md bg-gray-50
                         focus:outline-none focus:ring-2 focus:ring-amber-400
                         ${
                           selectedCategoria ? 'text-gray-800' : 'text-gray-400'
                         }
                         ${
                           errors.idCategoria
                             ? 'border-red-500'
                             : 'border-gray-200'
                         }`}
            >
              <option value={''} disabled hidden>
                Seleccionar una categoría
              </option>
              {formOptions?.categorias?.map((categoria) => (
                <option
                  key={categoria.idCategoria}
                  value={categoria.idCategoria}
                >
                  {categoria.nombre}
                </option>
              ))}
            </select>
            {errors.idCategoria && (
              <p className='mt-1 text-sm text-red-600'>
                {errors.idCategoria[0]}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor='idUnidad'
              className='block text-sm font-medium text-gray-500 mb-2'
            >
              Unidad
            </label>
            <select
              id='idUnidad'
              name='idUnidad'
              defaultValue={formData.idUnidad || ''}
              onChange={(e) => setSelectedUnidad(e.target.value)}
              className={`w-full px-4 py-2 font-roboto border rounded-md bg-gray-50
                         focus:outline-none focus:ring-2 focus:ring-amber-400
                          ${selectedUnidad ? 'text-gray-800' : 'text-gray-400'}
                         ${
                           errors.idUnidad
                             ? 'border-red-500'
                             : 'border-gray-200'
                         }`}
            >
              <option value={''} disabled hidden>
                Seleccionar unidad
              </option>
              {formOptions?.unidades?.map((unidad) => (
                <option key={unidad.idUnidad} value={unidad.idUnidad}>
                  {unidad.nombre}
                </option>
              ))}
            </select>
            {errors.idUnidad && (
              <p className='mt-1 text-sm text-red-600'>{errors.idUnidad[0]}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className='mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-3'>
          <ActionButton
            label='Cancelar'
            type='button'
            to='/productos'
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

export default ProductForm;
