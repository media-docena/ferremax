// src/components/common/AlertMessage.jsx

import React, { useEffect, useState, useCallback } from 'react';
import CheckCircleIcon from '../../assets/icons/check_circle.svg?react';
import ErrorIcon from '../../assets/icons/error.svg?react';
import WarningIcon from '../../assets/icons/warning.svg?react';
import InfoIcon from '../../assets/icons/info.svg?react';
import CloseIcon from '../../assets/icons/close.svg?react';

function AlertMessage({
  type = 'info',
  message,
  duration = 5000,
  onClose,
  dismissible = true,
  className = '',
}) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);


  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300);
  }, [onClose]); // Se recrea si onClose cambia

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, isVisible, handleClose]); 

  if (!isVisible) return null;

  const alertConfig = {
    success: {
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-700',
      icon: <CheckCircleIcon className='w-5 h-5' />,
      iconColor: 'text-green-500',
    },
    error: {
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-700',
      icon: <ErrorIcon className='w-5 h-5' />,
      iconColor: 'text-red-500',
    },
    warning: {
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-700',
      icon: <WarningIcon className='w-5 h-5' />,
      iconColor: 'text-yellow-500',
    },
    info: {
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
      icon: <InfoIcon className='w-5 h-5' />,
      iconColor: 'text-blue-500',
    },
  };

  const config = alertConfig[type] || alertConfig.info;

  return (
    <div
      className={`
        mb-4 p-4 rounded-lg border relative overflow-hidden
        ${config.bgColor} ${config.borderColor} ${config.textColor}
        flex items-start gap-3
        transition-all duration-300 ease-in-out
        ${
          isExiting
            ? 'opacity-0 translate-y-[-10px]'
            : 'opacity-100 translate-y-0'
        }
        ${className}
      `}
      role='alert'
    >
      {/* Icono */}
      <div className={`flex-shrink-0 ${config.iconColor}`}>{config.icon}</div>

      {/* Mensaje */}
      <div className='flex-1 text-sm font-medium'>{message}</div>

      {/* Botón de cerrar */}
      {dismissible && (
        <button
          onClick={handleClose}
          className={`flex-shrink-0 ${config.textColor} hover:opacity-70 transition-opacity`}
          aria-label='Cerrar alerta'
        >
          <CloseIcon className='w-4 h-4' />
        </button>
      )}

      {/* Barra de progreso */}
      <div
        className={`
          absolute bottom-0 left-0 h-1 ${config.borderColor.replace(
            'border',
            'bg'
          )}
          transition-all ease-linear
        `}
        style={{
          width: '100%',
          animation: `shrink ${duration}ms linear forwards`,
        }}
      />
    </div>
  );
}

export default AlertMessage;
