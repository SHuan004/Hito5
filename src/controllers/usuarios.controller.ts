import { Request, Response, NextFunction } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../services/usuarios.service";

/**
 * Obtener todos los usuarios
 */
const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const usuarios = await getAllUsers();
    if (usuarios && usuarios.length > 0) {
      res.json({ ok: true, data: usuarios });
    } else {
      res
        .status(404)
        .json({ ok: false, message: "No se encontraron usuarios." });
    }
  } catch (error) {
    next(error); // Pasar el error al middleware de manejo de errores
  }
};

/**
 * Obtener un usuario por su ID
 */
const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const usuario = await getUserById(id);
    if (!usuario) {
      res.status(404).json({ ok: false, message: "Usuario no encontrado" });
      return;
    }
    res.status(200).json({ ok: true, data: usuario });
  } catch (error) {
    next(error); // Pasar el error al middleware de manejo de errores
  }
};

/**
 * Crear un nuevo usuario
 */
const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      rut,
      username,
      nombre,
      apellido,
      email,
      password,
      id_tipo_usuario,
    } = req.body;

    // Llamar al servicio para crear el usuario
    try {
      const nuevoUsuario = await createUser({
        rut,
        username,
        nombre,
        apellido,
        email,
        password,
        id_tipo_usuario,
      });
      res.status(201).json({ ok: true, data: nuevoUsuario });
    } catch (err: any) {
      // Manejar errores como violaciones de unicidad
      if (err.message && err.message.includes("unique constraint")) {
        res.status(409).json({
          ok: false,
          error: "Ya existe un usuario con ese email, rut o username.",
        });
      } else {
        throw err; // Dejar que lo maneje el middleware global de errores
      }
    }
  } catch (error) {
    next(error); // Pasar el error al middleware de manejo de errores
  }
};

/**
 * Actualizar un usuario por su ID
 */
const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updatedUser = await updateUser(id, req.body);
    if (!updatedUser) {
      res.status(404).json({ ok: false, message: "Usuario no encontrado" });
      return;
    }
    res.status(200).json({ ok: true, data: updatedUser });
  } catch (error) {
    next(error); // Pasar el error al middleware de manejo de errores
  }
};

/**
 * Eliminar un usuario por su ID
 */
const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const usuarioEliminado = await deleteUser(id);
    if (!usuarioEliminado) {
      res.status(404).json({ ok: false, message: "Usuario no encontrado" });
      return;
    }
    res.status(200).json({ ok: true, message: "Usuario eliminado" });
  } catch (error) {
    next(error); // Pasar el error al middleware de manejo de errores
  }
};

/**
 * Exportar todas las funciones como un objeto
 */
export const UsuariosController = {
  getAll,
  getById,
  create,
  update,
  remove,
};
