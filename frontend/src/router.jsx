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
import {
  usuariosLoader,
  usuarioByIdLoader,
} from './api/loaders/usuariosLoaders';
import {
  productosLoader,
  productoByIdLoader,
} from './api/loaders/productosLoaders';
import { reportesLoader } from './api/loaders/reportesLoaders';
import { productosDisponiblesLoader } from './api/loaders/carritoVentaLoaders';
import { ventaByIdLoader } from './api/loaders/carritoVentaLoaders';
import { loginAction, logoutAction } from './api/actions/authActions';
import { changeUsuarioStatusAction } from './api/actions/usuariosActions';
import {
  changeProductoStatusAction,
  updateProductoAction,
  createProductoAction,
} from './api/actions/productosActions';

const router = createBrowserRouter([
  // Rutas públicas
  {
    path: 'login',
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
          { index: true, loader: productosLoader, Component: ProductosList },
          { path: 'crear', action: createProductoAction, Component: ProductoCrear },
          {
            path: ':productoId',
            children: [
              {
                index: true,
                loader: productoByIdLoader,
                action: changeProductoStatusAction,
                Component: ProductoDetalle,
              },
              {
                path: 'editar',
                loader: productoByIdLoader,
                action: updateProductoAction,
                Component: ProductoEditar,
              },
              { path: 'estado', action: changeProductoStatusAction },
            ],
          },
        ],
      },
      {
        path: 'usuarios',
        middleware: [roleMiddleware(['admin'])],
        children: [
          { index: true, loader: usuariosLoader, Component: UsuariosList },
          { path: 'crear', Component: UsuarioCrear },
          {
            path: ':usuarioId',
            children: [
              {
                index: true,
                action: changeUsuarioStatusAction,
                loader: usuarioByIdLoader,
                Component: UsuarioDetalle,
              },
              { path: 'editar', Component: UsuarioEditar },
              { path: 'estado', action: changeUsuarioStatusAction },
            ],
          },
        ],
      },
      {
        path: 'ventas',
        children: [
          { 
            index: true, 
            loader: productosDisponiblesLoader,
            Component: VentasList 
          },
          { path: 'factura/:idVenta', loader: ventaByIdLoader, Component: VentasFactura },
        ],
      },
      {
        path: 'reportes',
        middleware: [roleMiddleware(['admin', 'encargado'])],
        loader: reportesLoader,
        Component: ReportesList,
      },
      {
        path: 'documentacion',
        middleware: [roleMiddleware(['admin'])],
        Component: Documentacion,
      },
      {
        path: 'logout',
        action: logoutAction,
      },
    ],
  },
]);

export default router;
