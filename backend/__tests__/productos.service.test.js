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
    //  Se pueden agregar otros modelos aquí si se necesitan (ej: venta, usuario)
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
    jest.clearAllMocks();
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
      // --- Arrange (Organizar) ---

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
        ...expectedPrismaData, // Usamos el objeto de arriba
        fechaCreacion: new Date(),
      };

      // Se configura el mock de Prisma para devolver el objeto simulado.
      prisma.producto.create.mockResolvedValue(mockProductoCreado);

      
      // Se llama a la función "create" del servicio
      const resultado = await productosService.create(inputData);

      // --- Assert (Afirmar) ---

      // Se verifica que 'prisma.producto.create' fue llamado 1 vez.
      expect(prisma.producto.create).toHaveBeenCalledTimes(1);

      // Se verifica que Prisma fue llamado con los datos TRANSFORMADOS correctos.
      expect(prisma.producto.create).toHaveBeenCalledWith({
        data: expectedPrismaData,
        include: includeRelations,
      });

      // Se verifica que la función devolvió el objeto simulado por Prisma.
      expect(resultado).toEqual(mockProductoCreado);
    });

    // Test 2: "Corner Case" (Fallo de BD)
    // Se verifica el manejo de errores (bloque try...catch).
    test('Corner Case: debe lanzar un ApiError si prisma.producto.create falla', async () => {
      // --- Arrange (Organizar) ---

      // Se definen datos de entrada simples.
      const inputData = {
        nombre: 'Producto Roto',
        precio: 10,
      };

      // Se simula un error genérico de la BD.
      const errorDeBD = new Error('Error de base de datos simulado');

      // Se configura el mock de Prisma para RECHAZAR la promesa con el error.
      prisma.producto.create.mockRejectedValue(errorDeBD);

      // --- Act & Assert (Actuar y Afirmar) ---

      // Verificamos que llamar a la función 'create' RECHAZA la promesa y lanza el error.

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

  
});