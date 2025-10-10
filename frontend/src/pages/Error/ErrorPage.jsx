import { useRouteError, Link, useNavigate } from 'react-router';

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
        'Tu sesión ha expirado o no tienes permisos para acceder a este recurso.',
      statusDisplay: '401',
    },
    403: {
      title: 'Acceso prohibido',
      description: 'No tienes permisos para acceder a este recurso.',
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
    localStorage.removeItem('authToken');
    navigate('/auth/login');
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 md:p-12 relative overflow-hidden'>
      {/* Fondo decorativo con blobs animados*/}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-20 left-10 w-72 h-72 md:w-96 md:h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse'></div>
        <div
          className='absolute top-40 right-10 w-72 h-72 md:w-96 md:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse'
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className='absolute bottom-20 left-1/2 w-72 h-72 md:w-96 md:h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse'
          style={{ animationDelay: '4s' }}
        ></div>
      </div>

      {/* Contenido principal */}
      <div className='relative z-10 max-w-md md:max-w-3xl lg:max-w-4xl w-full'>
        {/* Contenedor de Error */}
        <div className='bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8 md:p-16 lg:p-20'>
          {/* Icono de error */}
          <div className='flex justify-center mb-6'>
            <div className='p-4 md:p-6 bg-gradient-to-br from-red-500 to-orange-500 rounded-full shadow-lg'>
              <svg
                className='w-12 h-12 md:w-16 md:h-16 text-white' // Icono más grande en desktop
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 9v2m0 4v2m0-6a6 6 0 1 1 0 12 6 6 0 0 1 0-12zm0-2a8 8 0 1 0 0 16 8 8 0 0 0 0-16z'
                />
              </svg>
            </div>
          </div>

          {/* Status code */}
          <div className='text-center mb-6'>
            <p className='text-6xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-red-400 via-orange-400 to-pink-400 bg-clip-text text-transparent'>
              {errorConfig.statusDisplay}
            </p>
          </div>

          {/* Título */}
          <h1 className='text-3xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-4'>
            {errorConfig.title}
          </h1>

          {/* Descripción */}
          <p className='text-gray-300 text-center mb-8 md:mb-10 text-lg md:text-xl leading-relaxed'>
            {errorConfig.description}
          </p>

          {/* Mensaje de error técnico (si aplica) */}
          {message && message !== 'unknown' && (
            <div className='bg-red-500/20 border border-red-500/50 rounded-lg p-4 md:p-6 mb-8 md:mb-10'>
              <p className='text-red-200 text-sm md:text-base font-mono break-words'>
                {message}
              </p>
            </div>
          )}

          {/* Botones de acción*/}
          <div className='flex flex-col gap-3 md:flex-row md:justify-center md:gap-4'>
            {/* Botón volver atrás */}
            <button
              onClick={handleGoBack}
              className='w-full md:w-auto flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg whitespace-nowrap'
            >
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                />
              </svg>
              Volver atrás
            </button>

            {/* Botón ir al inicio */}
            <Link
              to='/'
              className='w-full md:w-auto flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg no-underline whitespace-nowrap'
            >
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 11l4-2m0 0l4 2m-4-2v2m-6-4h.01M7 20h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v13a2 2 0 002 2z'
                />
              </svg>
              Ir al inicio
            </Link>

            {/* Botón ir a productos */}
            <Link
              to='/productos'
              className='w-full md:w-auto flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg no-underline whitespace-nowrap'
            >
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M20 7l-8-4-8 4m0 0l8-4m0 0l8 4m0 0v10l-8 4-8-4V7m8 4v10m0 0l-8-4m8 4l8-4'
                />
              </svg>
              Ver productos
            </Link>
          </div>

          {/* Botón cerrar sesión */}
          {status !== 404 && (
            <button
              onClick={handleLogout}
              className='mt-3 md:mt-4 w-full md:w-auto flex items-center justify-center gap-2 bg-red-500/20 border border-red-500 hover:bg-red-500/30 text-red-300 hover:text-red-200 font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg md:mx-auto' // Centrado en desktop
            >
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                />
              </svg>
              Cerrar sesión
            </button>
          )}

          {/* Footer informativo */}
          <div className='mt-8 pt-6 border-t border-white/10'>
            <p className='text-gray-400 text-xs md:text-sm text-center'>
              Si el problema persiste, por favor contacta al equipo de soporte
            </p>
          </div>
        </div>

        {/* Elemento decorativo */}
        <div className='mt-8 text-center'>
          <p className='text-gray-500 text-sm font-semibold'>Ferremax © 2025</p>
        </div>
      </div>
    </div>
  );
}
