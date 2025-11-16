/* eslint-disable no-undef */
import request from 'supertest';
import app from '../app.js'; // 1. Se importa la App de Express
import prisma from '../prisma/prismaClient.js'; // 2. Se importa Prisma (para setup y teardown)

/*
 TEST DE INTEGRACIÓN: Flujo de Venta
 Se prueba el flujo completo de Crear Venta y Actualizar Stock.
 */

// 1. SIMULACIÓN DE AUTENTICACIÓN
// Para evitar la necesidad de un token real ya que no se esta probando autenticación.

jest.mock('../middlewares/auth_middlewares.js', () => ({
  verifyToken: jest.fn((req, res, next) => {
    next();
  }),
  authorizeRole: jest.fn(() => (req, res, next) => {
    next();
  }),
}));

describe('Prueba de Integración: Flujo de Venta', () => {
  let testProducto;
  let testEmpleado;
  let testFormaPago;
  let testCategoria;
  let testMarca;

  jest.setTimeout(30000);

  // Setup 
  beforeAll(async () => {
   
    try {
      // Se limpia la BD 
      await prisma.detalleVenta.deleteMany({});
      await prisma.venta.deleteMany({});
      await prisma.productoProveedor.deleteMany({});
      await prisma.productosUnidad.deleteMany({});
      await prisma.producto.deleteMany({
        where: { nombre: { contains: 'Test Integracion' } },
      });

      await prisma.empleado.deleteMany({
        where: { nombre: { contains: 'Test Integracion' } },
      });
      await prisma.formaPago.deleteMany({
        where: { descripcion: { contains: 'Test Integracion' } },
      });
      await prisma.categoria.deleteMany({
        where: { nombre: { contains: 'Test Integracion' } },
      });
      await prisma.marca.deleteMany({
        where: { nombre: { contains: 'Test Integracion' } },
      });
    } catch (error) {
      console.error(
        'Error limpiando la base de datos en beforeAll:',
        error
      );
      throw error; 
    }

    // Se crean datos base con prisma para que la lógica del servicio pase las validaciones

    testCategoria = await prisma.categoria.create({
      data: { nombre: 'Test Integracion Categoria' },
    });

    testMarca = await prisma.marca.create({
      data: { nombre: 'Test Integracion Marca' },
    });

    testFormaPago = await prisma.formaPago.create({
      data: { descripcion: 'Test Integracion Efectivo' },
    });

    testEmpleado = await prisma.empleado.create({
      data: {
        nombre: 'Test Integracion Empleado',
        apellido: 'Prueba',
        dni: '123456789',
        direccion: 'Calle Falsa 123',
        telefono: '1122334455',
        estado: 'activo',
      },
    });

    // Se crea Producto de prueba con Prisma
    testProducto = await prisma.producto.create({
      data: {
        nombre: 'Test Integracion Martillo',
        codigo: 'TEST-INT-001',
        precio: 150.0,
        stock: 50, 
        stockMin: 5,
        estado: 'activo',
        idCategoria: testCategoria.idCategoria,
        idMarca: testMarca.idMarca,
      },
    });
  });

  // Teardown: Se ejecuta una vez después de todas las pruebas de este bloque
  afterAll(async () => {
    // Se limpia la BD 
    try {
      await prisma.detalleVenta.deleteMany({});
      await prisma.venta.deleteMany({});
      await prisma.productoProveedor.deleteMany({});
      await prisma.productosUnidad.deleteMany({});
      await prisma.producto.deleteMany({
        where: { nombre: { contains: 'Test Integracion' } },
      });

      await prisma.empleado.deleteMany({
        where: { nombre: { contains: 'Test Integracion' } },
      });
      await prisma.formaPago.deleteMany({
        where: { descripcion: { contains: 'Test Integracion' } },
      });
      await prisma.categoria.deleteMany({
        where: { nombre: { contains: 'Test Integracion' } },
      });
      await prisma.marca.deleteMany({
        where: { nombre: { contains: 'Test Integracion' } },
      });
    } catch (error) {
      console.error('Error durante la limpieza de la BD:', error);
    }

    // Se desconecta Prisma
    await prisma.$disconnect();
  });

  // TEST DE INTEGRACIÓN - Flujo de Venta

  it('debería crear una venta y descontar el stock del producto', async () => {
    
    const stockInicial = 50;
    const cantidadVendida = 5;
    const stockEsperado = stockInicial - cantidadVendida; // 45
    const precioProducto = 150.0;
    const subtotal = cantidadVendida * precioProducto; // 750.0

    // Body para la API de Ventas
    const bodyVenta = {
      idEmpleado: testEmpleado.idEmpleado,
      idFormaPago: testFormaPago.idFormaPago,
      productos: [
        {
          idProducto: testProducto.idProducto,
          cantidad: cantidadVendida,
          precio: precioProducto,
          subtotal: subtotal,
        },
      ],
    };

    // Se llama a la API /api/v1/carritoventa para crear la venta
    const responseVenta = await request(app)
      .post('/api/v1/carritoventa')
      .send(bodyVenta);

    
    // Se verifica que la API de Ventas respondió 201 (created)
    expect(responseVenta.statusCode).toBe(201);
    expect(responseVenta.body.data.idVenta).toBeDefined();
    expect(Number(responseVenta.body.data.totalVenta)).toBe(subtotal);
    expect(responseVenta.body.data.detalleventa.length).toBe(1);
    expect(
      responseVenta.body.data.detalleventa[0].idProducto
    ).toBe(testProducto.idProducto);

    // Verificación de Stock: se llama a la API de productos para verificar el stock
    const responseProd = await request(app).get(
      `/api/v1/productos/${testProducto.idProducto}`
    );

    // El Stock se descontó correctamente
    // Se verifica que la API de Productos respondió 200 
    expect(responseProd.statusCode).toBe(200);
    // Se comprueba que el stock se actualizó en la BD.
    expect(responseProd.body.data.stock).toBe(stockEsperado); 
    expect(responseProd.body.data.nombre).toBe(testProducto.nombre);
  });
});