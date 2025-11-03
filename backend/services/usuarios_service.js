import logger from '../config/logger.js';
import prisma from '../prisma/prismaClient.js';
import { ApiError } from '../utils/ApiError.js';

export default {
  async findAll() {
    try {
      return await prisma.usuario.findMany({
        omit: { password: true },
        orderBy: [{ fechaCreacion: 'desc' }],
        include: {
          empleado: true,
          usuariosrol: { include: { rol: true } },
        },
      });
    } catch (error) {
      logger.error('Error al obtener el listado de usuarios:', error);
      throw new ApiError(
        error.status || 500,
        'Error al obtener el listado de usuarios'
      );
    }
  },

  async findById(id) {
    try {
      return await prisma.usuario.findUnique({
        where: { idUsuario: id },
        include: {
          empleado: true,
          usuariosrol: { include: { rol: true } },
        },
      });
    } catch (error) {
      logger.error('Error al obtener un usuario por id:', error);
      throw new ApiError(
        error.status || 500,
        'Error al obtener un usuario por id'
      );
    }
  },

  async findByEmail(email) {
    try {
      return await prisma.usuario.findUnique({
        where: { correo: email },
        include: {
          empleado: true,
          usuariosrol: { include: { rol: true } },
        },
      });
    } catch (error) {
      logger.error('Error al obtener un usuario por correo:', error);
      throw new ApiError(
        error.status || 500,
        'Error al obtener un usuario por correo'
      );
    }
  },

  async create(userData, employeeData) {
    try {
      return await prisma.usuario.create({
        data: {
          correo: userData.correo,
          password: userData.password,
          estado: userData.estado || 'activo',
          empleado: {
            create: {
              nombre: employeeData.nombre,
              apellido: employeeData.apellido,
              dni: employeeData.dni,
              direccion: employeeData.direccion || null,
              telefono: employeeData.telefono || null,
              estado: employeeData.estado || 'activo',
            },
          },
          usuariosrol: {
            create: {
              idRol: userData.idRol,
            },
          },
        },
        omit: { password: true },
        include: {
          empleado: true,
          usuariosrol: {
            include: {
              rol: true,
            },
          },
        },
      });
    } catch (error) {
      logger.error('Error al crear un usuario:', error);
      throw new ApiError(error.status || 500, 'Error al crear un usuario');
    }
  },

  async update(id, userData, employeeData) {
    try {
      const { idRol, ...userDataToUpdate } = userData;

      const updateData = {
        ...userDataToUpdate,
      };

      // Solo se actualiza empleado si hay datos
      if (employeeData && Object.keys(employeeData).length > 0) {
        updateData.empleado = {
          update: employeeData,
        };
      }

      // Solo se actualiza rol si viene idRol
      if (idRol) {
        updateData.usuariosrol = {
          updateMany: {
            where: { idUsuario: id },
            data: { idRol: idRol },
          },
        };
      }

      return await prisma.usuario.update({
        where: { idUsuario: id },
        data: updateData,
        omit: { password: true },
        include: {
          empleado: true,
          usuariosrol: {
            include: {
              rol: true,
            },
          },
        },
      });
    } catch (error) {
      logger.error('Error al actulizar un usuario:', error);
      throw new ApiError(error.status || 500, 'Error al actualizar un usuario');
    }
  },

  async changeStatus(id, status) {
    try {
      return await prisma.usuario.update({
        where: { idUsuario: id },
        data: { estado: status, empleado: { update: { estado: status } } },
        include: {
          empleado: true,
        },
      });
    } catch (error) {
      logger.error('Error al cambiar el estado de un usuario:', error);
      throw new ApiError(
        error.status || 500,
        'Error al cambiar el estado de un usuario'
      );
    }
  },
};
