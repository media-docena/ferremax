import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UsuarioService from '../services/usuarios_service.js';
import { sendOk } from '../utils/ResponseHelper.js';
import { ApiError } from '../utils/ApiError.js';
import logger from '../config/logger.js';



export default {
  async login(req, res, next) {
    try {
      const { correo, password } = req.body;

      // Chequea que el usuario con el correo provisto exista
      const usuario = await UsuarioService.findByEmail(correo);

      if (!usuario)
        throw ApiError.badRequest(
          'Los datos son inválidos. Intentar nuevamente'
        );

      // Valida el estado del usuario
      if (usuario.estado !== 'activo') {
        throw ApiError.unauthorized('Usuario inactivo');
      }

      // Chequea que la contraseña sea correcta
      const validPassword = await bcrypt.compare(password, usuario.password);

      if (!validPassword)
        throw ApiError.badRequest(
          'Los datos son inválidos. Intentar nuevamente'
        );

      // Se crea el token de autenticación
      const token = jwt.sign(
        {
          id: usuario.empleado.idEmpleado,
          nombre: `${usuario.empleado.nombre} ${usuario.empleado.apellido}`,
          rol: usuario.usuariosrol[0]?.rol?.descripcion,
        },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
      );

      // Se contruye la data de la respuesta
      const userData = {
        token,
        user: {
          id: usuario.idUsuario,
          nombre: `${usuario.empleado.nombre} ${usuario.empleado.apellido}`,
          rol: usuario.usuariosrol[0]?.rol?.descripcion,
        },
        expiresIn: '28800',
        tokenType: 'Bearer',
      };

      // Respuesta OK
      sendOk(res, 'Login exitoso', userData);
      
    } catch (error) {
      logger.error('Error en el login de usuario', { error });
      next(error);
    }
  },
};
