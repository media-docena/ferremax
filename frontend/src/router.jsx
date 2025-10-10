import React from 'react';
import { createBrowserRouter } from 'react-router';
import Layout from './Layout';
import Home from './pages/Home/Home';
import ProductosList from './pages/Inventario/ProductosList';
import UsuariosList from './pages/Usuarios/UsuariosList';
import VentasList from './pages/Ventas/VentasList';
import ReportesList from './pages/Reportes/ReportesList';
import Documentacion from './pages/Documentacion/Documentacion';
import ErrorPage from './pages/Error/ErrorPage';
import ProductoDetalle from './pages/Inventario/ProductoDetalle';
import UsuarioDetalle from './pages/Usuarios/UsuarioDetalle';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: Home },
      { path: 'productos',
        children: [
          { index : true, Component: ProductosList },
          { path: ':productoId', Component: ProductoDetalle }
        ]
      },
      { path: 'usuarios', 
        children: [
          { index: true, Component: UsuariosList },
          { path: ':usuarioId', Component: UsuarioDetalle }
        ]
      },
      { path: 'ventas', Component: VentasList},
      { path: 'reportes', Component: ReportesList},
      { path: 'documentacion', Component: Documentacion},
    ],
  },
]);

export default router;
