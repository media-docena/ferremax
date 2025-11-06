import React from 'react';
import { createBrowserRouter } from 'react-router';
import { authMiddleware, roleMiddleware } from './Middlewares/authMiddleware';
import Layout from './Layout';
import Login from './pages/Login/Login';
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
import { layoutLoader } from './api/loaders/layoutLoaders';
import { usuariosLoader } from './api/loaders/usuariosLoaders';
import { loginAction, logoutAction } from './api/actions/authActions';
import { changeUsuarioStatusAction } from './api/actions/usuariosActions';

const router = createBrowserRouter([
  // Rutas públicas
  {
    path: '/login',
    Component: Login,
    errorElement: <ErrorPage />,
    action: loginAction,
  },
  // Rutas privadas
  {
    path: '/',
    middleware: [authMiddleware],
    loader: layoutLoader,
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
        middleware: [roleMiddleware(['admin'])],
        children: [
          { index: true, loader: usuariosLoader, Component: UsuariosList,},
          { path: ':usuarioId', Component: UsuarioDetalle },
          { path: ':usuarioId/editar', Component: UsuarioEditar },
          {
            path: ':usuarioId/estado',
            action: changeUsuarioStatusAction,
          },
          { path: 'crear', Component: UsuarioCrear },
        ],
      },
      {
        path: 'ventas',
        children: [
          { index: true, Component: VentasList },
          { path: 'factura', Component: VentasFactura },
        ],
      },
      {
        path: 'reportes',
        middleware: [roleMiddleware(['admin', 'encargado'])],
        Component: ReportesList,
      },
      {
        path: 'documentacion',
        middleware: [roleMiddleware(['admin'])],
        Component: Documentacion,
      },
      {
        path: '/logout',
        action: logoutAction,
      },
    ],
  },
]);

export default router;
