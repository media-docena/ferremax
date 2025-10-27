// prisma/seed.js

import   prisma  from './prismaClient.js';
import logger from '../config/logger.js';

async function main() {
  logger.info('Iniciando seed...');

  // Limpiar datos existentes 
  await prisma.$transaction([
    prisma.detalleVenta.deleteMany(),
    prisma.venta.deleteMany(),
    prisma.usuariosRol.deleteMany(),
    prisma.productosUnidad.deleteMany(),
    prisma.productoProveedor.deleteMany(),
    prisma.producto.deleteMany(),
    prisma.usuario.deleteMany(),
    prisma.empleado.deleteMany(),
    prisma.proveedor.deleteMany(),
    prisma.unidad.deleteMany(),
    prisma.formaPago.deleteMany(),
    prisma.rol.deleteMany(),
    prisma.marca.deleteMany(),
    prisma.categoria.deleteMany(),
  ]);

  logger.info('Datos anteriores eliminados');

  // ============ CATEGORÍAS ============
  const categorias = await Promise.all([
    prisma.categoria.create({ data: { nombre: 'Herramientas' } }),
    prisma.categoria.create({ data: { nombre: 'Pinturas' } }),
    prisma.categoria.create({ data: { nombre: 'Fijaciones' } }),
  ]);
  logger.info('Categorías creadas');

  // ============ MARCAS ============
  const marcas = await Promise.all([
    prisma.marca.create({ data: { nombre: 'Stanley' } }),
    prisma.marca.create({ data: { nombre: 'Alba' } }),
    prisma.marca.create({ data: { nombre: 'Fischer' } }),
    prisma.marca.create({ data: { nombre: 'Bahco' } }),
    prisma.marca.create({ data: { nombre: 'Bosch' } }),
    prisma.marca.create({ data: { nombre: 'Sherwin Williams' } }),
    prisma.marca.create({ data: { nombre: 'Truper' } }),
    prisma.marca.create({ data: { nombre: 'Patagonia' } }),
    prisma.marca.create({ data: { nombre: 'Delta Plus' } }),
    prisma.marca.create({ data: { nombre: '3M' } }),
  ]);
  logger.info('Marcas creadas');

  // ============ EMPLEADOS ============
  const empleados = await Promise.all([
    prisma.empleado.create({
      data: {
        nombre: 'Alberto',
        apellido: 'Martínez',
        dni: '20123456',
        direccion: 'Albariño 2048, CABA',
        telefono: '1145678901',
        estado: 'activo',
      },
    }),
    prisma.empleado.create({
      data: {
        nombre: 'Lucía',
        apellido: 'Fernández',
        dni: '30111222',
        direccion: 'Av. Rivadavia 1234, CABA',
        telefono: '1133344455',
        estado: 'activo',
      },
    }),
    prisma.empleado.create({
      data: {
        nombre: 'Carlos',
        apellido: 'Rodríguez',
        dni: '25789456',
        direccion: 'Calle Lavalle 567, CABA',
        telefono: '1156789012',
        estado: 'activo',
      },
    }),
  ]);
  logger.info('Empleados creados');

  // ============ USUARIOS ============
  const usuarios = await Promise.all([
    prisma.usuario.create({
      data: {
        correo: 'alberto@ferremax.com',
        password:
          '$2a$10$xGqX8qF5Z1J2K3L4M5N6O7P8Q9R0S1T2U3V4W5X6Y7Z8A9B0C1D2E3', // 123456 hasheado
        idEmpleado: empleados[0].idEmpleado,
        estado: 'activo',
      },
    }),
    prisma.usuario.create({
      data: {
        correo: 'lucia@ferremax.com',
        password:
          '$2a$10$xGqX8qF5Z1J2K3L4M5N6O7P8Q9R0S1T2U3V4W5X6Y7Z8A9B0C1D2E3',
        idEmpleado: empleados[1].idEmpleado,
        estado: 'activo',
      },
    }),
    prisma.usuario.create({
      data: {
        correo: 'carlos@ferremax.com',
        password:
          '$2a$10$xGqX8qF5Z1J2K3L4M5N6O7P8Q9R0S1T2U3V4W5X6Y7Z8A9B0C1D2E3',
        idEmpleado: empleados[2].idEmpleado,
        estado: 'activo',
      },
    }),
  ]);
  logger.info('Usuarios creados');

  // ============ ROLES ============
  const roles = await Promise.all([
    prisma.rol.create({ data: { descripcion: 'encargado' } }),
    prisma.rol.create({ data: { descripcion: 'admin' } }),
    prisma.rol.create({ data: { descripcion: 'vendedor' } }),
  ]);
  logger.info('Roles creados');

  // ============ USUARIOS-ROL ============
  await Promise.all([
    prisma.usuariosRol.create({
      data: { idUsuario: usuarios[0].idUsuario, idRol: roles[0].idRol },
    }),
    prisma.usuariosRol.create({
      data: { idUsuario: usuarios[0].idUsuario, idRol: roles[2].idRol },
    }),
    prisma.usuariosRol.create({
      data: { idUsuario: usuarios[1].idUsuario, idRol: roles[1].idRol },
    }),
    prisma.usuariosRol.create({
      data: { idUsuario: usuarios[2].idUsuario, idRol: roles[2].idRol },
    }),
  ]);
  logger.info('Relaciones Usuario-Rol creadas');

  // ============ UNIDADES ============
  const unidades = await Promise.all([
    prisma.unidad.create({ data: { nombre: 'Unidad', abreviatura: 'u' } }),
    prisma.unidad.create({ data: { nombre: 'Litro', abreviatura: 'lt' } }),
    prisma.unidad.create({ data: { nombre: 'Caja', abreviatura: 'cj' } }),
    prisma.unidad.create({ data: { nombre: 'Metro', abreviatura: 'm' } }),
    prisma.unidad.create({ data: { nombre: 'Kilogramo', abreviatura: 'kg' } }),
  ]);
  logger.info('Unidades creadas');

  // ============ PROVEEDORES ============
  const proveedores = await Promise.all([
    prisma.proveedor.create({
      data: {
        nombre: 'Ferretería Central',
        telefono: '1145678910',
        direccion: 'Av. Corrientes 123, CABA',
        correo: 'ventas@fcentral.com',
        estado: 'activo',
      },
    }),
    prisma.proveedor.create({
      data: {
        nombre: 'Distribuidora Alba',
        telefono: '1145678920',
        direccion: 'Av. Belgrano 456, CABA',
        correo: 'contacto@alba.com',
        estado: 'activo',
      },
    }),
    prisma.proveedor.create({
      data: {
        nombre: 'Suministros Fischer',
        telefono: '1145678930',
        direccion: 'Calle Mitre 789, CABA',
        correo: 'info@fischer.com',
        estado: 'activo',
      },
    }),
  ]);
  logger.info('Proveedores creados');

  // ============ PRODUCTOS ============
  const productos = await Promise.all([
    // Herramientas
    prisma.producto.create({
      data: {
        codigo: '7798116930007',
        nombre: 'Martillo de acero',
        descripcion: 'Martillo de acero con mango de goma',
        precio: 3500.00,
        stock: 20,
        stockMin: 5,
        idCategoria: categorias[0].idCategoria, // Herramientas
        idMarca: marcas[0].idMarca,
        estado: 'activo',
      },
    }),
    prisma.producto.create({
      data: {
        codigo: '7798116930014',
        nombre: 'Destornillador plano',
        descripcion: 'Destornillador punta plana 6mm',
        precio: 1200.00,
        stock: 50,
        stockMin: 10,
        idCategoria: categorias[0].idCategoria, // Herramientas
        idMarca: marcas[0].idMarca,
        estado: 'activo',
      },
    }),
    prisma.producto.create({
      data: {
        codigo: '7798062433005',
        nombre: 'Llave inglesa 12"',
        descripcion: 'Llave ajustable de 12 pulgadas',
        precio: 8500.00,
        stock: 25,
        stockMin: 5,
        idCategoria: categorias[0].idCategoria, // Herramientas
        idMarca: marcas[3].idMarca,
        estado: 'activo',
      },
    }),
    prisma.producto.create({
      data: {
        codigo: '3165140599139',
        nombre: 'Taladro percutor',
        descripcion: 'Taladro percutor eléctrico 600W',
        precio: 45000.00,
        stock: 10,
        stockMin: 2,
        idCategoria: categorias[0].idCategoria, // Herramientas
        idMarca: marcas[4].idMarca,
        estado: 'activo',
      },
    }),
    prisma.producto.create({
      data: {
        codigo: '7798116930021',
        nombre: 'Cinta métrica 5m',
        descripcion: 'Cinta métrica retráctil 5 metros',
        precio: 1800.00,
        stock: 40,
        stockMin: 10,
        idCategoria: categorias[0].idCategoria, // Herramientas
        idMarca: marcas[0].idMarca,
        estado: 'activo',
      },
    }),
    prisma.producto.create({
      data: {
        codigo: '7798062433012',
        nombre: 'Guantes de cuero',
        descripcion: 'Guantes de trabajo reforzados',
        precio: 3200.00,
        stock: 20,
        stockMin: 5,
        idCategoria: categorias[0].idCategoria, // Herramientas
        idMarca: marcas[8].idMarca,
        estado: 'activo',
      },
    }),
    prisma.producto.create({
      data: {
        codigo: '7899999999999',
        nombre: 'Máscara facial de seguridad',
        descripcion: 'Máscara plástica con visor transparente',
        precio: 5000.00,
        stock: 15,
        stockMin: 3,
        idCategoria: categorias[0].idCategoria, // Herramientas
        idMarca: marcas[9].idMarca,
        estado: 'activo',
      },
    }),
    prisma.producto.create({
      data: {
        codigo: '7798116930038',
        nombre: 'Sierra de mano',
        descripcion: 'Sierra para madera 18"',
        precio: 4200.00,
        stock: 18,
        stockMin: 5,
        idCategoria: categorias[0].idCategoria, // Herramientas
        idMarca: marcas[3].idMarca,
        estado: 'activo',
      },
    }),
    prisma.producto.create({
      data: {
        codigo: '7798062433029',
        nombre: 'Alicate universal 8"',
        descripcion: 'Alicate multiuso 8 pulgadas',
        precio: 2800.00,
        stock: 30,
        stockMin: 8,
        idCategoria: categorias[0].idCategoria, // Herramientas
        idMarca: marcas[3].idMarca,
        estado: 'activo',
      },
    }),
    // Pinturas
    prisma.producto.create({
      data: {
        codigo: '7790703006009',
        nombre: 'Pintura blanca 4L',
        descripcion: 'Latex interior',
        precio: 12000.00,
        stock: 15,
        stockMin: 3,
        idCategoria: categorias[1].idCategoria, // Pinturas
        idMarca: marcas[1].idMarca,
        fechaVencimiento: new Date('2026-05-01'),
        estado: 'activo',
      },
    }),
    prisma.producto.create({
      data: {
        codigo: '7790703006016',
        nombre: 'Pintura esmalte sintético 1L',
        descripcion: 'Esmalte brillante color negro',
        precio: 6000.00,
        stock: 18,
        stockMin: 4,
        idCategoria: categorias[1].idCategoria, // Pinturas
        idMarca: marcas[5].idMarca,
        fechaVencimiento: new Date('2026-08-01'),
        estado: 'activo',
      },
    }),
    prisma.producto.create({
      data: {
        codigo: 'ROD-ESP-22CM',
        nombre: 'Rodillo pintura 22cm',
        descripcion: 'Rodillo de lana con mango plástico',
        precio: 2200.00,
        stock: 30,
        stockMin: 5,
        idCategoria: categorias[1].idCategoria, // Pinturas
        idMarca: marcas[6].idMarca,
        estado: 'activo',
      },
    }),
    prisma.producto.create({
      data: {
        codigo: 'PINC-PROF-3IN',
        nombre: 'Pincel profesional 3"',
        descripcion: 'Pincel cerda sintética 3 pulgadas',
        precio: 1500.00,
        stock: 35,
        stockMin: 8,
        idCategoria: categorias[1].idCategoria, // Pinturas
        idMarca: marcas[6].idMarca,
        estado: 'activo',
      },
    }),
    // Fijaciones
    prisma.producto.create({
      data: {
        codigo: 'TORN-5X50-100U',
        nombre: 'Caja de tornillos 100u',
        descripcion: 'Tornillos 5mm x 50mm',
        precio: 4500.00,
        stock: 40,
        stockMin: 10,
        idCategoria: categorias[2].idCategoria, // Fijaciones
        idMarca: marcas[2].idMarca,
        estado: 'activo',
      },
    }),
    prisma.producto.create({
      data: {
        codigo: 'CLAV-2IN-500U',
        nombre: 'Clavos 2" caja 500u',
        descripcion: 'Clavos de acero 2 pulgadas',
        precio: 2500.00,
        stock: 60,
        stockMin: 15,
        idCategoria: categorias[2].idCategoria, // Fijaciones
        idMarca: marcas[2].idMarca,
        estado: 'activo',
      },
    }),
    prisma.producto.create({
      data: {
        codigo: 'TORN-DW-25MM-200U',
        nombre: 'Tornillos drywall caja 200u',
        descripcion: 'Tornillos punta aguja 25mm',
        precio: 3800.00,
        stock: 35,
        stockMin: 8,
        idCategoria: categorias[2].idCategoria, // Fijaciones
        idMarca: marcas[7].idMarca,
        estado: 'activo',
      },
    }),
  ]);
  logger.info('Productos creados');

  // ============ PRODUCTOS-UNIDAD ============
  await Promise.all([
    // Herramientas (unidad)
    prisma.productosUnidad.create({
      data: {
        idProducto: productos[0].idProducto,
        idUnidad: unidades[0].idUnidad,
      },
    }),
    prisma.productosUnidad.create({
      data: {
        idProducto: productos[1].idProducto,
        idUnidad: unidades[0].idUnidad,
      },
    }),
    prisma.productosUnidad.create({
      data: {
        idProducto: productos[2].idProducto,
        idUnidad: unidades[0].idUnidad,
      },
    }),
    prisma.productosUnidad.create({
      data: {
        idProducto: productos[3].idProducto,
        idUnidad: unidades[0].idUnidad,
      },
    }),
    prisma.productosUnidad.create({
      data: {
        idProducto: productos[4].idProducto,
        idUnidad: unidades[0].idUnidad,
      },
    }),
    prisma.productosUnidad.create({
      data: {
        idProducto: productos[5].idProducto,
        idUnidad: unidades[0].idUnidad,
      },
    }),
    prisma.productosUnidad.create({
      data: {
        idProducto: productos[6].idProducto,
        idUnidad: unidades[0].idUnidad,
      },
    }),
    prisma.productosUnidad.create({
      data: {
        idProducto: productos[7].idProducto,
        idUnidad: unidades[0].idUnidad,
      },
    }),
    prisma.productosUnidad.create({
      data: {
        idProducto: productos[8].idProducto,
        idUnidad: unidades[0].idUnidad,
      },
    }),
    // Pinturas (litros y unidades)
    prisma.productosUnidad.create({
      data: {
        idProducto: productos[9].idProducto,
        idUnidad: unidades[1].idUnidad,
      },
    }),
    prisma.productosUnidad.create({
      data: {
        idProducto: productos[10].idProducto,
        idUnidad: unidades[1].idUnidad,
      },
    }),
    prisma.productosUnidad.create({
      data: {
        idProducto: productos[11].idProducto,
        idUnidad: unidades[0].idUnidad,
      },
    }),
    prisma.productosUnidad.create({
      data: {
        idProducto: productos[12].idProducto,
        idUnidad: unidades[0].idUnidad,
      },
    }),
    // Fijaciones (cajas)
    prisma.productosUnidad.create({
      data: {
        idProducto: productos[13].idProducto,
        idUnidad: unidades[2].idUnidad,
      },
    }),
    prisma.productosUnidad.create({
      data: {
        idProducto: productos[14].idProducto,
        idUnidad: unidades[2].idUnidad,
      },
    }),
    prisma.productosUnidad.create({
      data: {
        idProducto: productos[15].idProducto,
        idUnidad: unidades[2].idUnidad,
      },
    }),
  ]);
  logger.info('Relaciones Producto-Unidad creadas');

  // ============ PRODUCTO-PROVEEDOR ============
  await Promise.all([
    // Herramientas
    prisma.productoProveedor.create({
      data: {
        idProducto: productos[0].idProducto,
        idProveedor: proveedores[0].idProveedor,
      },
    }),
    prisma.productoProveedor.create({
      data: {
        idProducto: productos[1].idProducto,
        idProveedor: proveedores[0].idProveedor,
      },
    }),
    prisma.productoProveedor.create({
      data: {
        idProducto: productos[2].idProducto,
        idProveedor: proveedores[0].idProveedor,
      },
    }),
    prisma.productoProveedor.create({
      data: {
        idProducto: productos[3].idProducto,
        idProveedor: proveedores[0].idProveedor,
      },
    }),
    prisma.productoProveedor.create({
      data: {
        idProducto: productos[4].idProducto,
        idProveedor: proveedores[0].idProveedor,
      },
    }),
    prisma.productoProveedor.create({
      data: {
        idProducto: productos[5].idProducto,
        idProveedor: proveedores[0].idProveedor,
      },
    }),
    prisma.productoProveedor.create({
      data: {
        idProducto: productos[6].idProducto,
        idProveedor: proveedores[0].idProveedor,
      },
    }),
    prisma.productoProveedor.create({
      data: {
        idProducto: productos[7].idProducto,
        idProveedor: proveedores[0].idProveedor,
      },
    }),
    prisma.productoProveedor.create({
      data: {
        idProducto: productos[8].idProducto,
        idProveedor: proveedores[0].idProveedor,
      },
    }),
    // Pinturas
    prisma.productoProveedor.create({
      data: {
        idProducto: productos[9].idProducto,
        idProveedor: proveedores[1].idProveedor,
      },
    }),
    prisma.productoProveedor.create({
      data: {
        idProducto: productos[10].idProducto,
        idProveedor: proveedores[1].idProveedor,
      },
    }),
    prisma.productoProveedor.create({
      data: {
        idProducto: productos[11].idProducto,
        idProveedor: proveedores[1].idProveedor,
      },
    }),
    prisma.productoProveedor.create({
      data: {
        idProducto: productos[12].idProducto,
        idProveedor: proveedores[1].idProveedor,
      },
    }),
    // Fijaciones
    prisma.productoProveedor.create({
      data: {
        idProducto: productos[13].idProducto,
        idProveedor: proveedores[2].idProveedor,
      },
    }),
    prisma.productoProveedor.create({
      data: {
        idProducto: productos[14].idProducto,
        idProveedor: proveedores[2].idProveedor,
      },
    }),
    prisma.productoProveedor.create({
      data: {
        idProducto: productos[15].idProducto,
        idProveedor: proveedores[2].idProveedor,
      },
    }),
  ]);
  logger.info('Relaciones Producto-Proveedor creadas');

  // ============ FORMAS DE PAGO ============
  const formasPago = await Promise.all([
    prisma.formaPago.create({ data: { descripcion: 'Efectivo' } }),
    prisma.formaPago.create({ data: { descripcion: 'Tarjeta de Crédito' } }),
    prisma.formaPago.create({
      data: { descripcion: 'Transferencia Bancaria' },
    }),
    prisma.formaPago.create({ data: { descripcion: 'Tarjeta de Débito' } }),
  ]);
  logger.info('Formas de pago creadas');

  // ============ VENTAS Y DETALLES ============
  // Venta 1 - 10/09/2025
  const venta1 = await prisma.venta.create({
    data: {
      idEmpleado: empleados[0].idEmpleado,
      fecha: new Date('2025-09-10'),
      hora: new Date('2025-09-10T10:30:00'),
      idFormaPago: formasPago[0].idFormaPago,
      totalVenta: 0,
    },
  });

  await Promise.all([
    prisma.detalleVenta.create({
      data: {
        idVenta: venta1.idVenta,
        idProducto: productos[0].idProducto, // Martillo
        cantidad: 2,
        precio: 3500.00,
        subtotal: 2 * 3500.00,
      },
    }),
    prisma.detalleVenta.create({
      data: {
        idVenta: venta1.idVenta,
        idProducto: productos[10].idProducto, // Caja tornillos
        cantidad: 1,
        precio: 4500.00,
        subtotal: 1 * 4500.00,
      },
    }),
  ]);

  await prisma.venta.update({
    where: { idVenta: venta1.idVenta },
    data: { totalVenta: 11500.00 },
  });

  // Venta 2 - 10/09/2025
  const venta2 = await prisma.venta.create({
    data: {
      idEmpleado: empleados[1].idEmpleado,
      fecha: new Date('2025-09-10'),
      hora: new Date('2025-09-10T11:00:00'),
      idFormaPago: formasPago[1].idFormaPago,
      totalVenta: 0,
    },
  });

  await prisma.detalleVenta.create({
    data: {
      idVenta: venta2.idVenta,
      idProducto: productos[7].idProducto, // Pintura blanca
      cantidad: 1,
      precio: 12000.00,
      subtotal: 12000.00,
    },
  });

  await prisma.venta.update({
    where: { idVenta: venta2.idVenta },
    data: { totalVenta: 12000.00 },
  });

  // Venta 3 - 11/09/2025
  const venta3 = await prisma.venta.create({
    data: {
      idEmpleado: empleados[0].idEmpleado,
      fecha: new Date('2025-09-11'),
      hora: new Date('2025-09-11T09:15:00'),
      idFormaPago: formasPago[0].idFormaPago,
      totalVenta: 0,
    },
  });

  await Promise.all([
    prisma.detalleVenta.create({
      data: {
        idVenta: venta3.idVenta,
        idProducto: productos[1].idProducto, // Destornillador
        cantidad: 2,
        precio: 1200.00,
        subtotal: 2400.00,
      },
    }),
    prisma.detalleVenta.create({
      data: {
        idVenta: venta3.idVenta,
        idProducto: productos[4].idProducto, // Cinta métrica
        cantidad: 1,
        precio: 1800.00,
        subtotal: 1800.00,
      },
    }),
  ]);

  await prisma.venta.update({
    where: { idVenta: venta3.idVenta },
    data: { totalVenta: 4200.00 },
  });

  // Venta 4 - 11/09/2025 - TALADRO (producto caro para estadísticas)
  const venta4 = await prisma.venta.create({
    data: {
      idEmpleado: empleados[1].idEmpleado,
      fecha: new Date('2025-09-11'),
      hora: new Date('2025-09-11T10:00:00'),
      idFormaPago: formasPago[1].idFormaPago,
      totalVenta: 0,
    },
  });

  await Promise.all([
    prisma.detalleVenta.create({
      data: {
        idVenta: venta4.idVenta,
        idProducto: productos[3].idProducto, // Taladro
        cantidad: 1,
        precio: 45000.00,
        subtotal: 45000.00,
      },
    }),
    prisma.detalleVenta.create({
      data: {
        idVenta: venta4.idVenta,
        idProducto: productos[5].idProducto, // Guantes
        cantidad: 2,
        precio: 3200.00,
        subtotal: 6400.00,
      },
    }),
  ]);

  await prisma.venta.update({
    where: { idVenta: venta4.idVenta },
    data: { totalVenta: 51400.00 },
  });

  // Venta 5 - 11/09/2025
  const venta5 = await prisma.venta.create({
    data: {
      idEmpleado: empleados[0].idEmpleado,
      fecha: new Date('2025-09-11'),
      hora: new Date('2025-09-11T11:45:00'),
      idFormaPago: formasPago[2].idFormaPago,
      totalVenta: 0,
    },
  });

  await Promise.all([
    prisma.detalleVenta.create({
      data: {
        idVenta: venta5.idVenta,
        idProducto: productos[9].idProducto, // Rodillo
        cantidad: 1,
        precio: 2200.00,
        subtotal: 2200.00,
      },
    }),
    prisma.detalleVenta.create({
      data: {
        idVenta: venta5.idVenta,
        idProducto: productos[8].idProducto, // Pintura esmalte
        cantidad: 1,
        precio: 6000.00,
        subtotal: 6000.00,
      },
    }),
  ]);

  await prisma.venta.update({
    where: { idVenta: venta5.idVenta },
    data: { totalVenta: 8200.00 },
  });

  // Venta 6 - 12/09/2025
  const venta6 = await prisma.venta.create({
    data: {
      idEmpleado: empleados[1].idEmpleado,
      fecha: new Date('2025-09-12'),
      hora: new Date('2025-09-12T14:20:00'),
      idFormaPago: formasPago[0].idFormaPago,
      totalVenta: 0,
    },
  });

  await Promise.all([
    prisma.detalleVenta.create({
      data: {
        idVenta: venta6.idVenta,
        idProducto: productos[11].idProducto, // Clavos
        cantidad: 3,
        precio: 2500.00,
        subtotal: 7500.00,
      },
    }),
    prisma.detalleVenta.create({
      data: {
        idVenta: venta6.idVenta,
        idProducto: productos[6].idProducto, // Máscara
        cantidad: 1,
        precio: 5000.00,
        subtotal: 5000.00,
      },
    }),
  ]);

  await prisma.venta.update({
    where: { idVenta: venta6.idVenta },
    data: { totalVenta: 12500.00 },
  });

  // Venta 7 - 12/09/2025
  const venta7 = await prisma.venta.create({
    data: {
      idEmpleado: empleados[0].idEmpleado,
      fecha: new Date('2025-09-12'),
      hora: new Date('2025-09-12T16:00:00'),
      idFormaPago: formasPago[1].idFormaPago,
      totalVenta: 0,
    },
  });

  await Promise.all([
    prisma.detalleVenta.create({
      data: {
        idVenta: venta7.idVenta,
        idProducto: productos[2].idProducto, // Llave inglesa
        cantidad: 2,
        precio: 8500.00,
        subtotal: 17000.00,
      },
    }),
    prisma.detalleVenta.create({
      data: {
        idVenta: venta7.idVenta,
        idProducto: productos[12].idProducto, // Tornillos drywall
        cantidad: 2,
        precio: 3800.00,
        subtotal: 7600.00,
      },
    }),
  ]);

  await prisma.venta.update({
    where: { idVenta: venta7.idVenta },
    data: { totalVenta: 24600.00 },
  });

  // Venta 8 - 15/09/2025 - Pintura blanca 
  const venta8 = await prisma.venta.create({
    data: {
      idEmpleado: empleados[2].idEmpleado,
      fecha: new Date('2025-09-15'),
      hora: new Date('2025-09-15T10:30:00'),
      idFormaPago: formasPago[0].idFormaPago,
      totalVenta: 0,
    },
  });

  await Promise.all([
    prisma.detalleVenta.create({
      data: {
        idVenta: venta8.idVenta,
        idProducto: productos[7].idProducto, // Pintura blanca 
        cantidad: 2,
        precio: 12000.00,
        subtotal: 24000.00,
      },
    }),
    prisma.detalleVenta.create({
      data: {
        idVenta: venta8.idVenta,
        idProducto: productos[9].idProducto, // Rodillo
        cantidad: 2,
        precio: 2200.00,
        subtotal: 4400.00,
      },
    }),
  ]);

  await prisma.venta.update({
    where: { idVenta: venta8.idVenta },
    data: { totalVenta: 28400.00 },
  });

  // Venta 9 - 16/09/2025 - Martillo 
  const venta9 = await prisma.venta.create({
    data: {
      idEmpleado: empleados[1].idEmpleado,
      fecha: new Date('2025-09-16'),
      hora: new Date('2025-09-16T11:15:00'),
      idFormaPago: formasPago[3].idFormaPago,
      totalVenta: 0,
    },
  });

  await Promise.all([
    prisma.detalleVenta.create({
      data: {
        idVenta: venta9.idVenta,
        idProducto: productos[0].idProducto, // Martillo 
        cantidad: 1,
        precio: 3500.00,
        subtotal: 3500.00,
      },
    }),
    prisma.detalleVenta.create({
      data: {
        idVenta: venta9.idVenta,
        idProducto: productos[1].idProducto, // Destornillador
        cantidad: 3,
        precio: 1200.00,
        subtotal: 3600.00,
      },
    }),
    prisma.detalleVenta.create({
      data: {
        idVenta: venta9.idVenta,
        idProducto: productos[4].idProducto, // Cinta métrica
        cantidad: 2,
        precio: 1800.00,
        subtotal: 3600.00,
      },
    }),
  ]);

  await prisma.venta.update({
    where: { idVenta: venta9.idVenta },
    data: { totalVenta: 10700.00 },
  });

  // Venta 10 - 18/09/2025 - Herramientas variadas
  const venta10 = await prisma.venta.create({
    data: {
      idEmpleado: empleados[0].idEmpleado,
      fecha: new Date('2025-09-18'),
      hora: new Date('2025-09-18T09:45:00'),
      idFormaPago: formasPago[0].idFormaPago,
      totalVenta: 0,
    },
  });

  await Promise.all([
    prisma.detalleVenta.create({
      data: {
        idVenta: venta10.idVenta,
        idProducto: productos[7].idProducto, // Sierra de mano
        cantidad: 2,
        precio: 4200.00,
        subtotal: 8400.00,
      },
    }),
    prisma.detalleVenta.create({
      data: {
        idVenta: venta10.idVenta,
        idProducto: productos[8].idProducto, // Alicate
        cantidad: 3,
        precio: 2800.00,
        subtotal: 8400.00,
      },
    }),
  ]);

  await prisma.venta.update({
    where: { idVenta: venta10.idVenta },
    data: { totalVenta: 16800.00 },
  });

  // Venta 11 - 20/09/2025 - Pintura con accesorios
  const venta11 = await prisma.venta.create({
    data: {
      idEmpleado: empleados[2].idEmpleado,
      fecha: new Date('2025-09-20'),
      hora: new Date('2025-09-20T14:00:00'),
      idFormaPago: formasPago[1].idFormaPago,
      totalVenta: 0,
    },
  });

  await Promise.all([
    prisma.detalleVenta.create({
      data: {
        idVenta: venta11.idVenta,
        idProducto: productos[9].idProducto, // Pintura blanca 
        cantidad: 1,
        precio: 12000.00,
        subtotal: 12000.00,
      },
    }),
    prisma.detalleVenta.create({
      data: {
        idVenta: venta11.idVenta,
        idProducto: productos[12].idProducto, // Pincel
        cantidad: 2,
        precio: 1500.00,
        subtotal: 3000.00,
      },
    }),
  ]);

  await prisma.venta.update({
    where: { idVenta: venta11.idVenta },
    data: { totalVenta: 15000.00 },
  });

  // Venta 12 - 22/09/2025 - Fijaciones múltiples 
  const venta12 = await prisma.venta.create({
    data: {
      idEmpleado: empleados[1].idEmpleado,
      fecha: new Date('2025-09-22'),
      hora: new Date('2025-09-22T10:20:00'),
      idFormaPago: formasPago[0].idFormaPago,
      totalVenta: 0,
    },
  });

  await Promise.all([
    prisma.detalleVenta.create({
      data: {
        idVenta: venta12.idVenta,
        idProducto: productos[13].idProducto, // Tornillos (repetido)
        cantidad: 5,
        precio: 4500.00,
        subtotal: 22500.00,
      },
    }),
    prisma.detalleVenta.create({
      data: {
        idVenta: venta12.idVenta,
        idProducto: productos[14].idProducto, // Clavos 
        cantidad: 4,
        precio: 2500.00,
        subtotal: 10000.00,
      },
    }),
    prisma.detalleVenta.create({
      data: {
        idVenta: venta12.idVenta,
        idProducto: productos[15].idProducto, // Tornillos drywall 
        cantidad: 3,
        precio: 3800.00,
        subtotal: 11400.00,
      },
    }),
  ]);

  await prisma.venta.update({
    where: { idVenta: venta12.idVenta },
    data: { totalVenta: 43900.00 },
  });

  // Venta 13 - 25/09/2025 - Guantes 
  const venta13 = await prisma.venta.create({
    data: {
      idEmpleado: empleados[0].idEmpleado,
      fecha: new Date('2025-09-25'),
      hora: new Date('2025-09-25T15:30:00'),
      idFormaPago: formasPago[2].idFormaPago,
      totalVenta: 0,
    },
  });

  await Promise.all([
    prisma.detalleVenta.create({
      data: {
        idVenta: venta13.idVenta,
        idProducto: productos[5].idProducto, // Guantes 
        cantidad: 5,
        precio: 3200.00,
        subtotal: 16000.00,
      },
    }),
    prisma.detalleVenta.create({
      data: {
        idVenta: venta13.idVenta,
        idProducto: productos[6].idProducto, // Máscara 
        cantidad: 3,
        precio: 5000.00,
        subtotal: 15000.00,
      },
    }),
  ]);

  await prisma.venta.update({
    where: { idVenta: venta13.idVenta },
    data: { totalVenta: 31000.00 },
  });

  // Venta 14 - 28/09/2025 - Combo herramientas
  const venta14 = await prisma.venta.create({
    data: {
      idEmpleado: empleados[2].idEmpleado,
      fecha: new Date('2025-09-28'),
      hora: new Date('2025-09-28T11:00:00'),
      idFormaPago: formasPago[1].idFormaPago,
      totalVenta: 0,
    },
  });

  await Promise.all([
    prisma.detalleVenta.create({
      data: {
        idVenta: venta14.idVenta,
        idProducto: productos[2].idProducto, // Llave inglesa 
        precio: 8500.00,
        subtotal: 8500.00,
        cantidad: 1,
      },
    }),
    prisma.detalleVenta.create({
      data: {
        idVenta: venta14.idVenta,
        idProducto: productos[0].idProducto, // Martillo 
        cantidad: 1,
        precio: 3500.00,
        subtotal: 3500.00,
      },
    }),
    prisma.detalleVenta.create({
      data: {
        idVenta: venta14.idVenta,
        idProducto: productos[1].idProducto, // Destornillador 
        cantidad: 2,
        precio: 1200.00,
        subtotal: 2400.00,
      },
    }),
  ]);

  await prisma.venta.update({
    where: { idVenta: venta14.idVenta },
    data: { totalVenta: 14400.00 },
  });

  // Venta 15 - 30/09/2025 - Pintura esmalte 
  const venta15 = await prisma.venta.create({
    data: {
      idEmpleado: empleados[1].idEmpleado,
      fecha: new Date('2025-09-30'),
      hora: new Date('2025-09-30T16:45:00'),
      idFormaPago: formasPago[3].idFormaPago,
      totalVenta: 0,
    },
  });

  await Promise.all([
    prisma.detalleVenta.create({
      data: {
        idVenta: venta15.idVenta,
        idProducto: productos[8].idProducto, // Pintura esmalte 
        cantidad: 3,
        precio: 6000.00,
        subtotal: 18000.00,
      },
    }),
    prisma.detalleVenta.create({
      data: {
        idVenta: venta15.idVenta,
        idProducto: productos[9].idProducto, // Rodillo 
        cantidad: 3,
        precio: 2200.00,
        subtotal: 6600.00,
      },
    }),
  ]);

  await prisma.venta.update({
    where: { idVenta: venta15.idVenta },
    data: { totalVenta: 24600.00 },
  });

  logger.info('Ventas y detalles creados');

  logger.info('\n Seed completado exitosamente!');
  logger.info('\n Resumen de datos creados:');
  logger.info(
    `   - ${categorias.length} categorías (Herramientas, Pinturas, Fijaciones)`
  );
  logger.info(`   - ${marcas.length} marcas`);
  logger.info(`   - ${empleados.length} empleados`);
  logger.info(`   - ${usuarios.length} usuarios`);
  logger.info(`   - ${roles.length} roles`);
  logger.info(`   - ${unidades.length} unidades`);
  logger.info(`   - ${proveedores.length} proveedores`);
  logger.info(`   - ${productos.length} productos`);
  logger.info(`   - ${formasPago.length} formas de pago`);
  logger.info('   - 15 ventas con múltiples detalles');
  logger.info('\n   Distribución por categorías:');
  logger.info('   - Herramientas: 9 productos');
  logger.info('   - Pinturas: 4 productos');
  logger.info('   - Fijaciones: 3 productos');
  logger.info('\n   Productos con múltiples ventas (para estadísticas):');
  logger.info('   - Martillo: 3 ventas');
  logger.info('   - Pintura blanca 4L: 3 ventas');
  logger.info('   - Destornillador: 3 ventas');
  logger.info('   - Guantes: 2 ventas');
  logger.info('   - Clavos: 2 ventas');
  logger.info('   - Tornillos: 2 ventas');
  logger.info('   - Rodillo: 3 ventas');
  logger.info('   - Pintura esmalte: 2 ventas');
}

main()
  .catch((e) => {
    logger.error('Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });