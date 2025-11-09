import React from 'react';
import SwapIcon from '../../assets/icons/swap.svg?react';

function ConfirmModal({
  isOpen,
  color = 'red',
  entityName,
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  const colorClasses = {
    red: 'text-red-500 bg-red-500 hover:bg-red-600 border-red-500',
    green: 'text-green-500 bg-green-500 hover:bg-green-600 border-green-500',
  };

  return (
    <div
      className='fixed inset-0 flex justify-center items-center  bg-black/10 backdrop-blur-sm z-50'
      id='confirm-modal'
    >
      <div className='w-full max-w-md bg-white rounded-xl shadow-lg p-6 relative'>
        <div className='text-center'>
          <SwapIcon
            className={`w-16 h-16 mx-auto ${colorClasses[color].split(' ')[0]}`}
          />
          <h2 className='text-xl font-roboto font-bold py-4'>
            ¿Está seguro/a?
          </h2>
          <p className='text-sm text-gray-600'>
            Esta acción va a {color === 'red' ? 'dar de baja' : 'activar'} al{' '}
            {entityName}.
          </p>
        </div>

        <div className='flex justify-center gap-4 mt-6'>
          <button
            onClick={onCancel}
            className='bg-white border text-gray-700 px-5 py-2 rounded-full font-roboto text-sm hover:bg-gray-100 shadow-sm'
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className={`text-white px-5 py-2 rounded-full font-roboto text-sm shadow-sm border ${colorClasses[color]}`}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
