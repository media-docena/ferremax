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
import ProductoEditar from './pages/Inventario/ProductoEditar';
import ProductoCrear from './pages/Inventario/ProductoCrear';
import UsuarioCrear from './pages/Usuarios/UsuarioCrear';
import UsuarioEditar from './pages/Usuarios/UsuarioEditar';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: Home },
      {
        path: 'productos',
        children: [
          { index: true, Component: ProductosList },
          { path: 'crear', Component: ProductoCrear },
          {
            path: ':productoId',
            children: [
              { index: true, Component: ProductoDetalle },
              { path: 'editar', Component: ProductoEditar },
            ],
          },
        ],
      },
      {
        path: 'usuarios',
        children: [
          { index: true, Component: UsuariosList },
          { path: ':usuarioId', Component: UsuarioDetalle },
          { path: ':usuarioId/editar', Component: UsuarioEditar },
          { path: 'crear', Component: UsuarioCrear },
        ],
      },
      { path: 'ventas', Component: VentasList },
      { path: 'reportes', Component: ReportesList },
      { path: 'documentacion', Component: Documentacion },
    ],
  },
]);

export default router;
