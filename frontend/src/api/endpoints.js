export const endpoints = {
  // Auth
  login: '/auth/login',

  // Usuarios
  usuarios: '/usuarios',
  usuariosById: (id) => `/usuarios/${id}`,
  usuarioEstado: (id) => `/usuarios/${id}/estado`,

  // Productos
  productos: '/productos',
  productosById: (id) => `/productos/${id}`,
  productoEstado: (id) => `/productos/${id}/estado`,
  productosExportarCSV: '/productos/exportar/csv',

  // Ventas
  ventas: '/ventas',
  ventasTopProductos: '/ventas/stats/top-productos',

  // Proveedores
  proveedores: '/proveedores',

  // Marcas
  marcas: '/marcas',

  // Categorias
  categorias: '/categorias',

  // Unidades
  unidades: '/unidades',

  // Roles
  roles: '/roles',
};