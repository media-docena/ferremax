/* eslint-disable no-unused-vars */
import productosService from '../services/productos_service.js';
import { ApiError } from '../utils/ApiError.js';
import prisma from '../prisma/prismaClient.js';
import logger from '../config/logger.js';

//SIMULACIÓN DE DEPENDENCIAS

// Se simulan las dependencias externas (Prisma, Logger) para evitar efectos secundarios (llamadas a BD, logs en consola).

// Se mockea el cliente de Prisma.
// Se reemplaza cada función de 'prisma.producto' con un mock de Jest.

jest.mock('../prisma/prismaClient.js', () => ({
  // Se usa '__esModule: true' y 'default' porque el servicio usa 'import prisma from ...'
  __esModule: true,
  default: {
    producto: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    
  },
}));

// Se mockea el logger para que no imprima en la consola durante los tests
jest.mock('../config/logger.js', () => ({
  __esModule: true,
  default: {
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
  },
}));

// TESTS UNITARIOS para productosService

describe('productosService (Pruebas Unitarias)', () => {
  // Se limpian los mocks después de cada prueba para que el conteo de llamadas de un test no afecte al siguiente.
  afterEach(() => {
    jest.resetAllMocks(); 
  });

  // TEST DE LA FUNCIÓN: create()
  describe('create', () => {
    // Se define el objeto 'include' que el servicio usa en sus respuestas.
    const includeRelations = {
      productoproveedor: true,
      productosunidad: true,
      categoria: true,
      marca: true,
    };

    // Test 1: Se verifica la transformación de datos y la llamada correcta a Prisma.
    test('Happy Path: debe crear un producto y transformar los datos de relaciones correctamente', async () => {
      // Se definen los datos de entrada (simula el body del controlador).
      const inputData = {
        nombre: 'Martillo Test',
        precio: 150.75,
        stock: 50,
        stockMin: 10,
        idProveedor: 1,
        idUnidad: 2,
        idMarca: 3,
        idCategoria: 4,
      };

      // Se define el objeto 'createData' esperado.
      // Este es el objeto que la función 'create' debe construir.
      const expectedPrismaData = {
        nombre: 'Martillo Test',
        precio: 150.75,
        stock: 50,
        stockMin: 10,
        productoproveedor: {
          create: { idProveedor: 1 },
        },
        productosunidad: {
          create: { idUnidad: 2 },
        },
        marca: {
          connect: { idMarca: 3 },
        },
        categoria: {
          connect: { idCategoria: 4 },
        },
      };

      // Se simula la respuesta de la BD.
      const mockProductoCreado = {
        idProducto: 1,
        ...expectedPrismaData, // Usa el objeto de arriba
        fechaCreacion: new Date(),
      };

      // Se configura el mock de Prisma para devolver el objeto simulado.
      prisma.producto.create.mockResolvedValue(mockProductoCreado);

      // Se llama a la función "create" del servicio
      const resultado = await productosService.create(inputData);

      // Se verifica que 'prisma.producto.create' fue llamado 1 vez.
      expect(prisma.producto.create).toHaveBeenCalledTimes(1);

      // Se verifica que Prisma fue llamado con los datos transformados correctos.
      expect(prisma.producto.create).toHaveBeenCalledWith({
        data: expectedPrismaData,
        include: includeRelations,
      });

      // Se verifica que la función devolvió el objeto simulado por Prisma.
      expect(resultado).toEqual(mockProductoCreado);
    });

    // Test 2: Fallo de BD. Se verifica el manejo de errores (bloque try...catch).
    test('Corner Case: debe lanzar un ApiError si prisma.producto.create falla', async () => {
      // Se definen datos de entrada.
      const inputData = {
        nombre: 'Producto Roto',
        precio: 10,
      };

      // Se simula un error genérico de la BD.
      const errorDeBD = new Error('Error de base de datos simulado');

      // Se configura el mock de Prisma para rechazar la promesa con el error.
      prisma.producto.create.mockRejectedValue(errorDeBD);

      // Se verifica que llamar a la función 'create' rechaza la promesa y lanza el error.

      // Se usa un try/catch en el test para validar el error lanzado.
      try {
        await productosService.create(inputData);
        // Si el código llega acá, el test debe fallar (no se lanzó error).
        throw new Error('La función debió lanzar un error');
      } catch (error) {
        // Se verifica que el error es una instancia de ApiError.
        // Esto prueba que el bloque 'catch' funciona.
        expect(error).toBeInstanceOf(ApiError);

        // Se verifica el mensaje y status del error (definidos en el 'catch' del servicio).
        expect(error.message).toBe('Error al crear el producto');
        expect(error.status).toBe(500);
      }

      // Se verifica que se intentó llamar a la BD (aunque haya fallado)
      expect(prisma.producto.create).toHaveBeenCalledTimes(1);
    });
  });
  
  // TEST DE LA FUNCIÓN: findAll()
  describe('findAll', () => {
    // Test 1: Prueba que el listado de productos funciona correctamente.
    test('Happy Path: debe devolver una lista de productos', async () => {
      // Se simula la respuesta de la BD (un array de productos).
      const mockListaProductos = [
        { idProducto: 1, nombre: 'Producto A' },
        { idProducto: 2, nombre: 'Producto B' },
      ];
      // Se configura el mock de Prisma.
      prisma.producto.findMany.mockResolvedValue(mockListaProductos);

      // Se llama a la función 'findAll' del servicio.
      const resultado = await productosService.findAll();

      // Se verifica que el resultado es el array simulado.
      expect(resultado).toEqual(mockListaProductos);

      // Se verifica que 'prisma.producto.findMany' fue llamado 1 vez.
      expect(prisma.producto.findMany).toHaveBeenCalledTimes(1);
    });
  });

  // TEST DE LA FUNCIÓN: findById()
  describe('findById', () => {
    // Test 1: Prueba que un producto se obtiene correctamente por ID.
    test('Happy Path: debe devolver un solo producto si lo encuentra', async () => {
      const idProducto = 1;
      // Se simula la respuesta de la BD.
      const mockProducto = {
        idProducto: 1,
        nombre: 'Producto Encontrado',
      };
      // Se configura el mock de Prisma.
      prisma.producto.findUnique.mockResolvedValue(mockProducto);

      const resultado = await productosService.findById(idProducto);

      // Se verifica que el resultado es el objeto simulado.
      expect(resultado).toEqual(mockProducto);

      // Se verifica que 'findUnique' fue llamado con el ID correcto.
      expect(prisma.producto.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.producto.findUnique).toHaveBeenCalledWith({
        where: { idProducto: idProducto },
        include: expect.any(Object), // Se verifica que se pidió el 'include'.
      });
    });

    // Test 2: Prueba cuando el producto no existe (devuelve null).
    test('Corner Case: debe devolver null si el producto no existe', async () => {
      const idProducto = 99; // ID simulado que no existe.
      // Se configura el mock para que devuelva null.
      prisma.producto.findUnique.mockResolvedValue(null);

      const resultado = await productosService.findById(idProducto);

      // Se verifica que el resultado es null.
      expect(resultado).toBeNull();
    });

    // Test 3: prueba el manejo de errores de la base de datos.
    test('Corner Case: debe lanzar un ApiError si la base de datos falla', async () => {
      const idProducto = 1;
      const errorDeBD = new Error('Error de BD simulado');
      
      // Se configura el mock para que lance un error.
      prisma.producto.findUnique.mockRejectedValue(errorDeBD);

      try {
        await productosService.findById(idProducto);
        throw new Error('La función debió lanzar un error');
      } catch (error) {
        // Se verifica que el bloque 'catch' del servicio funciona.
        expect(error).toBeInstanceOf(ApiError);
        // Se verifica el mensaje de error del servicio 
        expect(error.message).toBe('Error al crear el producto');
      }
    });
  });

  describe('update', () => {
    // Se define el objeto 'include' que el servicio usa en sus respuestas.
    const includeRelations = {
      productoproveedor: true,
      productosunidad: true,
      categoria: true,
      marca: true,
    };

    // Test 1: prueba la actualización de datos y la transformación correcta.
    test('Happy Path: debe actualizar un producto y transformar los datos', async () => {
      const idProducto = 1;
      // Se definen los datos de entrada.
      const inputData = {
        nombre: 'Martillo Actualizado',
        precio: 200.0,
        idMarca: 5,
        idProveedor: 2,
        idUnidad: 3, // Se agrega idUnidad para testear
      };

      // Se define el objeto 'updateData' esperado
      const expectedPrismaData = {
        nombre: 'Martillo Actualizado',
        precio: 200.0,
        marca: { connect: { idMarca: 5 } },
        productoproveedor: {
          deleteMany: {},
          create: { idProveedor: 2 },
        },
        productosunidad: { 
          deleteMany: {},
          create: { idUnidad: 3 },
        },
      };

      // Se simula la respuesta de la BD.
      const mockProductoActualizado = {
        idProducto: 1,
        nombre: 'Martillo Actualizado',
      };
      // Se configura el mock de Prisma.
      prisma.producto.update.mockResolvedValue(mockProductoActualizado);

      const resultado = await productosService.update(idProducto, inputData);

      // Se verifica que 'prisma.producto.update' fue llamado 1 vez.
      expect(prisma.producto.update).toHaveBeenCalledTimes(1);

      // Se verifica que Prisma fue llamado con los datos transformados correctos.
      expect(prisma.producto.update).toHaveBeenCalledWith({
        where: { idProducto: idProducto },
        data: expectedPrismaData,
        include: includeRelations,
      });

      // Se verifica que la función devolvió el objeto simulado.
      expect(resultado).toEqual(mockProductoActualizado);
    });

    // Test 2: Prueba el manejo de errores genéricos de la base de datos.
    // Se verifica el manejo de errores específicos de Prisma (P2025).
    test('Corner Case: debe lanzar ApiError.notFound si el producto no existe (P2025)', async () => {
      const idProducto = 99;
      const inputData = { nombre: 'Intento de Update' };

      // Se simula un error P2025 de Prisma (Registro no encontrado).
      const errorP2025 = new Error('Registro no encontrado');
      errorP2025.code = 'P2025';

      // Se configura el mock para que lance este error.
      prisma.producto.update.mockRejectedValue(errorP2025);

      try {
        await productosService.update(idProducto, inputData);
        throw new Error('La función debió lanzar un error');
      } catch (error) {
        // Se verifica que el error es una instancia de ApiError.
        expect(error).toBeInstanceOf(ApiError);
        // Se verifica que es el error 'notFound'.
        expect(error.status).toBe(404);
        expect(error.message).toBe('Producto no encontrado');
      }
    });

    // Test 3: prueba el manejo de errores específicos de Prisma (P2003).
    test('Corner Case: debe lanzar ApiError.notFound si la clave foránea falla (P2003)', async () => {
      const idProducto = 1;
      const inputData = { nombre: 'Update con mal ID', idProveedor: 999 };

      // Se simula un error P2003 de Prisma (Fallo de clave foránea).
      const errorP2003 = new Error('Fallo de clave foránea');
      errorP2003.code = 'P2003';

      // Se configura el mock para que lance este error.
      prisma.producto.update.mockRejectedValue(errorP2003);

      try {
        await productosService.update(idProducto, inputData);
        throw new Error('La función debió lanzar un error');
      } catch (error) {
        // Se verifica el mensaje específico para P2003.
        expect(error).toBeInstanceOf(ApiError);
        expect(error.status).toBe(404);
        expect(error.message).toBe(
          'El proveedor o unidad especificado no existe'
        );
      }
    });
  });

  // TEST DE LA FUNCIÓN: changeStatus()
  describe('changeStatus', () => {
    // Test 1: prueba la actualización del estado de un producto.
    test('Happy Path: debe actualizar solo el estado de un producto', async () => {
      const idProducto = 1;
      const nuevoEstado = 'INACTIVO';
      const mockProducto = {
        idProducto: 1,
        nombre: 'Producto A',
        estado: 'INACTIVO',
      };

      // Se configura el mock de Prisma.
      prisma.producto.update.mockResolvedValue(mockProducto);

      const resultado = await productosService.changeStatus(
        idProducto,
        nuevoEstado
      );

      // Se verifica que el resultado es el objeto simulado.
      expect(resultado).toEqual(mockProducto);
      // Se verifica que 'update' fue llamado con los datos correctos.
      expect(prisma.producto.update).toHaveBeenCalledTimes(1);
      expect(prisma.producto.update).toHaveBeenCalledWith({
        where: { idProducto: idProducto },
        data: { estado: nuevoEstado },
        // Se verifica que usa el 'select' específico de esta función.
        select: { idProducto: true, nombre: true, estado: true },
      });
    });

    // Test 2: prueba el manejo de errores específicos de Prisma (P2025).
    test('Corner Case: debe lanzar ApiError.notFound si el producto no existe (P2025)', async () => {
      const idProducto = 99;
      // Se simula un error P2025 de Prisma.
      const errorP2025 = new Error('Registro no encontrado');
      errorP2025.code = 'P2025';
      // Se configura el mock para que lance el error.
      prisma.producto.update.mockRejectedValue(errorP2025);

      try {
        await productosService.changeStatus(idProducto, 'INACTIVO');
        throw new Error('La función debió lanzar un error');
      } catch (error) {
        // Se verifica el mensaje de error específico de este 'catch'.
        expect(error).toBeInstanceOf(ApiError);
        expect(error.status).toBe(404);
        expect(error.message).toBe('Producto no encontrado para actualizar');
      }
    });
  });

  // TEST DE LA FUNCIÓN: findByCode()
  describe('findByCode', () => {
    // Test 1: prueba que un producto se obtiene correctamente por código.
    test('Happy Path: debe devolver un producto por su código', async () => {

      const codigo = 'A123';
      const mockProducto = { idProducto: 1, codigo: 'A123', nombre: 'Test' };
      // Se configura el mock de Prisma.
      prisma.producto.findUnique.mockResolvedValue(mockProducto);

      const resultado = await productosService.findByCode(codigo);

      // Se verifica el resultado.
      expect(resultado).toEqual(mockProducto);
      // Se verifica la llamada a findUnique con el 'where' correcto.
      expect(prisma.producto.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.producto.findUnique).toHaveBeenCalledWith({
        where: { codigo: codigo },
      });
    });

    // Test 2: prueba el manejo de errores genéricos de la base de datos.
    test('Corner Case: debe lanzar un ApiError si la base de datos falla', async () => {
      const codigo = 'A123';
      const errorDeBD = new Error('Error de BD simulado');
      // Se configura el mock para que lance un error.
      prisma.producto.findUnique.mockRejectedValue(errorDeBD);

      try {
        await productosService.findByCode(codigo);
        throw new Error('La función debió lanzar un error');
      } catch (error) {
        // Se verifica el 'catch' genérico de la función.
        expect(error).toBeInstanceOf(ApiError);
        expect(error.message).toBe('Error al obtener el producto por código');
      }
    });
  });


});