import UsuarioService from '../services/usuarios_service.js';
import EmpleadoService from '../services/empleados_service.js'
import { sendOk, sendCreated } from '../utils/ResponseHelper.js';
import { ApiError } from '../utils/ApiError.js';
import logger from '../config/logger.js';
import { obtenerMensajeEstado } from './utils.js';
import bcrypt from 'bcrypt';

export default {
  async listar(req, res, next) {
    try {
      const usuarios = await UsuarioService.findAll();

      if (!usuarios || usuarios?.length === 0)
        throw ApiError.notFound('No se encontraron registros');

      sendOk(res, 'Usuario(s) obtenido(s) correctamente', usuarios);
    } catch (error) {
      logger.error('Error al listar usuarios', { error });
      next(error);
    }
  },

  async obtenerPorId(req, res, next) {
    try {
      const usuario = await UsuarioService.findById(req.params.id);

      if (!usuario) throw ApiError.notFound('Usuario no encontrado');

      sendOk(res, 'Usuario obtenido correctamente', usuario);
    } catch (error) {
      logger.error('Error al obtener un usuario por id', { error });
      next(error);
    }
  },

  async cambiarEstado(req, res, next) {
    try {
      const { id } = req.params;
      const { estado } = req.body;

      const usuarioActualizado = await UsuarioService.changeStatus(id, estado);

      if (!usuarioActualizado)
        throw ApiError.notFound('Usuario no encontrado para actualizar estado');

      const mensaje = obtenerMensajeEstado(estado, 'Producto');

      sendOk(res, mensaje, usuarioActualizado);
    } catch (error) {
      logger.error('Error al cambiar de estado de un usuario', { error });
      next(error);
    }
  },

  async crear(req, res, next) {
    try {
      const {
        correo,
        password,
        estado,
        nombre,
        apellido,
        dni,
        direccion,
        telefono,
        idRol
      } = req.body;

      const usuarioExiste = await UsuarioService.findByEmail(correo);
      if (usuarioExiste) throw ApiError.conflict('El correo ya está en uso');

      const dniEnUso = await EmpleadoService.findByDNI(dni);
      if (dniEnUso) throw ApiError.conflict('El DNI ya está en uso');

      // Se encripta la contraseña
      const hashedPass = await bcrypt.hash(password, 10);

      // Se construyen los datos
      const userData = { correo, password: hashedPass, estado, idRol };
      const employeeData = {
        nombre,
        apellido,
        dni,
        direccion,
        telefono,
        estado,
      };

      const nuevoUsuario = await UsuarioService.create(userData, employeeData);

      sendCreated(res, 'Usuario registrado exitosamente', nuevoUsuario);
      
    } catch (error) {
      logger.error('Error al crear un usuario', { error });
      next(error);
    }
  },

  async actualizar(req, res, next) {
    try {
      const { id } = req.params;
      const {
        correo,
        password,
        estado,
        nombre,
        apellido,
        dni,
        direccion,
        telefono,
        idRol,
      } = req.body;

      const usuarioExiste = await UsuarioService.findById(id);
      if (!usuarioExiste) throw ApiError.notFound('Usuario no encontrado');

      // Si viene un correo diferente, se verifica que no esté en uso
      if (correo && correo !== usuarioExiste.correo) {
        const correoEnUso = await UsuarioService.findByEmail(correo);
        if (correoEnUso) throw ApiError.conflict('El correo ya está en uso');
      }

      // Si viene un DNI diferente, se verifica que no esté en uso
      if (dni && usuarioExiste.empleado?.dni !== dni) {
        const dniEnUso = await EmpleadoService.findByDNI(dni);
        if (dniEnUso) throw ApiError.conflict('El DNI ya está en uso');
      }

      // Se construyen los datos
      const userData = {
        ...(correo !== undefined && { correo }),
        ...(password !== undefined && {
          password: await bcrypt.hash(password, 10),
        }),
        ...(estado !== undefined && { estado }),
        ...(idRol !== undefined && { idRol }),
      };

      const employeeData = {
        ...(nombre !== undefined && { nombre }),
        ...(apellido !== undefined && { apellido }),
        ...(dni !== undefined && { dni }),
        ...(direccion !== undefined && { direccion }),
        ...(telefono !== undefined && { telefono }),
        ...(estado !== undefined && { estado }),
      };

      const usuarioActualizado = await UsuarioService.update(
        id,
        userData,
        employeeData,
      );

      sendOk(res, 'Usuario actualizado exitosamente', usuarioActualizado);
      
    } catch (error) {
      logger.error('Error al crear un usuario', { error });
      next(error);
    }
  },
};
