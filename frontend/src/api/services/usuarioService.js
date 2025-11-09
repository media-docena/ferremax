import axiosInstance from '../axiosConfig';
import { endpoints } from '../endpoints';
import logger from '../../../config/logger';

export const usuarioService = {
    getAll: async () => {
        try {
            const response = await axiosInstance.get(endpoints.usuarios);
            return response.data;
        } catch (error) {
            logger.error('Error al obtener listado de usuarios:', error);
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const response = await axiosInstance.get(endpoints.usuariosById(id));
            return response.data;
        } catch (error) {
            logger.error('Error al obtener un usuario por ID:', error);
            throw error;
        }
    },

    create: async (usuarioData) => {
        try {
            const response = await axiosInstance.post(endpoints.usuarios, usuarioData);
            return response.data;
        } catch (error) {
            logger.error('Error al crear un usuario:', error);
            throw error;
        }
    },

    update: async (id, usuarioData) => {
        try {
            const response = await axiosInstance.put(endpoints.usuariosById(id), usuarioData);
            return response.data;
        } catch (error) {
            logger.error('Error al actualizar el usuario:', error);
            throw error;
        }
    },

    changeStatus: async (id, estado) => {
        try {
            const response = await axiosInstance.patch(endpoints.usuarioEstado(id), estado);
            return response.data;
        } catch (error) {
            logger.error('Error al cambiar el estado del usuario:', error);
            throw error;
        }
    },
}