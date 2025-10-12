import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Logo from '../../assets/icons/logo.svg'

function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Usuario de prueba
  const usuarioPrueba = {
    nombre: 'Alberto',
    apellido: 'Martinez',
    rol: 'Administrador',
    correo: 'albertom@gmail.com',
    password: 'admin123',
  };

  // Si ya hay sesión activa, redirigir a home
  useEffect(() => {
    const usuario = localStorage.getItem('userSession');
    if (usuario) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      correo === usuarioPrueba.correo &&
      password === usuarioPrueba.password
    ) {
      setError('');
      const { password: _password, ...userSession } = usuarioPrueba;
      localStorage.setItem(
        'userSession',
        JSON.stringify(userSession)
      );
      navigate('/');
    } else {
      setError('Datos no válidos. Intentar nuevamente');
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 px-4'>
      <div className='w-full max-w-md'>
        {/* Header con logo */}
        <div className='bg-yellow-400 py-8 flex justify-center items-center rounded-t-md shadow'>
          <img src={Logo} alt='FerreMax logo' className='w-30 mb-2' />
          <h1 className='text-4xl font-roboto font-bold text-gray-800'>
            FerreMax
          </h1>
        </div>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className='bg-white p-6 rounded-b-md shadow-md'
        >
          <div className='mb-4'>
            <label
              htmlFor='correo'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Correo
            </label>
            <input
              id='correo'
              type='email'
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder='Ingrese su correo'
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent'
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Contraseña
            </label>
            <input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Ingrese su contraseña'
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent'
            />
          </div>

          {/* Error */}
          {error && (
            <p className='text-red-500 bg-red-200 py-2 rounded-md text-sm mb-3 text-center'>
              {error}
            </p>
          )}

          {/* Botón */}
          <button
            type='submit'
            className='w-full bg-gray-800 text-white my-2 py-3 rounded-md font-medium
                       hover:bg-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400'
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
