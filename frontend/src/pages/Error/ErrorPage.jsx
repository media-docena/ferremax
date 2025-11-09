import { useRouteError, Link, useNavigate } from 'react-router';
import ActionButton from '../../components/common/Buttons/ActionButton';
import GoBackIcon from '../../assets/icons/arrow_back.svg?react';
import HomeIcon from '../../assets/icons/home.svg?react';
import ProductsIcon from '../../assets/icons/inventory.svg?react';
import LogoutIcon from '../../assets/icons/logout.svg?react';
import ErrorIcon from '../../assets/icons/error.svg?react';

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  // Determinar tipo de error
  const status = error?.status || 'unknown';
  const message = error?.statusText || error?.message || 'Algo salió mal';

  // Mensajes personalizados por tipo de error
  const errorMessages = {
    404: {
      title: 'Página no encontrada',
      description: 'Lo sentimos, la página que buscas no existe o fue movida.',
      statusDisplay: '404',
    },
    401: {
      title: 'No autorizado',
      description:
        'Tu sesión ha expirado o no tenés permisos para acceder a este recurso.',
      statusDisplay: '401',
    },
    403: {
      title: 'Acceso prohibido',
      description: 'No tenés permisos para acceder a este recurso.',
      statusDisplay: '403',
    },
    500: {
      title: 'Error interno del servidor',
      description:
        'Hubo un problema en el servidor. Por favor, intenta más tarde.',
      statusDisplay: '500',
    },
    unknown: {
      title: '¡Oops! Algo salió mal',
      description: 'Ocurrió un error inesperado. Por favor, intenta de nuevo.',
      statusDisplay: '⚡',
    },
  };

  const errorConfig = errorMessages[status] || errorMessages.unknown;

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4 md:p-12 relative overflow-hidden'>
      <div className='relative z-10 max-w-md md:max-w-3xl lg:max-w-4xl w-full'>
        <div className='bg-white rounded-xl shadow-2xl p-8 md:p-16 lg:p-20'>

          {/* Icono de error */}
          <ErrorIcon className='w-20 h-20 md:w-30 md:h-30 lg:w-24 lg:h-24 text-yellow-500 mx-auto mb-6' />
          {/* Status code */}
          <div className='text-center mb-6'>
            <p className='text-6xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-red-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent'>
              {errorConfig.statusDisplay}
            </p>
          </div>

          {/* Título */}
          <h1 className='text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 text-center mb-4'>
            {errorConfig.title}
          </h1>

          {/* Descripción */}
          <p className='text-gray-600 text-center mb-8 md:mb-10 text-lg md:text-xl leading-relaxed'>
            {errorConfig.description}
          </p>

          {/* Mensaje de error técnico */}
          {message && message !== 'unknown' && (
            // Mantenemos el estilo de error técnico
            <div className='bg-red-100 border border-red-300 rounded-lg p-4 md:p-6 mb-8 md:mb-10'>
              <p className='text-red-700 text-sm md:text-base font-mono break-words text-center'>
                {message}
              </p>
            </div>
          )}

          {/* Botones de acción*/}
          <div className='flex flex-col gap-3 md:flex-row md:justify-center md:gap-4'>
            
            <ActionButton
              label='Volver atrás'
              icon={<GoBackIcon className='w-5 h-5' />}
              variant='warning' 
              onClick={handleGoBack}
              className='w-full md:w-auto flex-1 whitespace-nowrap' 
            />

            <ActionButton
              label='Ir al inicio'
              icon={<HomeIcon className='w-5 h-5' />}
              variant='success' 
              to='/'
              className='w-full md:w-auto flex-1 whitespace-nowrap'
            />

            <ActionButton
              label='Ver productos'
              icon={<ProductsIcon className='w-5 h-5' />}
              variant='info' 
              to='/productos'
              className='w-full md:w-auto flex-1 whitespace-nowrap'
            />
          </div>

          {status !== 404 && (
            <ActionButton
              label='Cerrar sesión'
              icon={<LogoutIcon className='w-5 h-5' />}
              variant='danger' 
              onClick={handleLogout}
              className='mt-3 md:mt-4 md:w-auto md:mx-auto'
            />
          )}

          {/* Footer informativo */}
          <div className='mt-8 pt-6 border-t border-gray-200'>
            <p className='text-gray-500 text-xs md:text-sm text-center'>
              Si el problema persiste, por favor contactar al equipo de soporte
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
