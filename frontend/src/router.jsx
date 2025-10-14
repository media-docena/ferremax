import React from 'react';
import { createBrowserRouter } from 'react-router';
import authMiddleware from './Middlewares/authMiddleware';
import Login from './pages/Login/Login';
import Layout from './Layout';
import Home from './pages/Home/Home';
import UsuariosList from './pages/Usuarios/UsuariosList';
import UsuarioCrear from './pages/Usuarios/UsuarioCrear';
import UsuarioEditar from './pages/Usuarios/UsuarioEditar';
import UsuarioDetalle from './pages/Usuarios/UsuarioDetalle';
import ProductosList from './pages/Inventario/ProductosList';
import ProductoDetalle from './pages/Inventario/ProductoDetalle';
import ProductoEditar from './pages/Inventario/ProductoEditar';
import ProductoCrear from './pages/Inventario/ProductoCrear';
import VentasList from './pages/Ventas/VentasList';
import VentasFactura from './pages/Ventas/VentasFactura';
import ReportesList from './pages/Reportes/ReportesList';
import Documentacion from './pages/Documentacion/Documentacion';
import ErrorPage from './pages/Error/ErrorPage';


const router = createBrowserRouter([
  {
    path: '/login',
    Component: Login,
    errorElement: <ErrorPage />,
  },
  {
    path: '/',
    middleware: [authMiddleware],
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
      { path: 'ventas',
        children: [
          { index: true, Component: VentasList },
          { path: 'factura', Component: VentasFactura },
        ],
      },
      { path: 'reportes', Component: ReportesList },
      { path: 'documentacion', Component: Documentacion },
    ],
  },
]);

export default router;
