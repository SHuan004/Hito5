import { Request, Response, NextFunction } from "express";
import {
  getAllTiposUsuario,
  getTiposUsuarioById,
  createTiposUsuario,
  updateTiposUsuario,
  deleteTiposUsuario,
} from "../services/tiposUsuario.service";

/**
 * Obtener todos los tipos de usuario
 */
const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tiposUsuario = await getAllTiposUsuario();
    if (tiposUsuario && tiposUsuario.length > 0) {
      res.json({ ok: true, data: tiposUsuario });
    } else {
      res
        .status(404)
        .json({ ok: false, message: "No se encontraron tipos de usuario." });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Obtener un tipo de usuario por su ID
 */
const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const tipoUsuario = await getTiposUsuarioById(id);
    if (!tipoUsuario) {
      res
        .status(404)
        .json({ ok: false, message: "Tipo de usuario no encontrado." });
      return;
    }
    res.status(200).json({ ok: true, data: tipoUsuario });
  } catch (error) {
    next(error);
  }
};

/**
 * Crear un nuevo tipo de usuario
 */
const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { nombre } = req.body;
    const nuevoTipoUsuario = await createTiposUsuario({ nombre });
    res.status(201).json({ ok: true, data: nuevoTipoUsuario });
  } catch (error) {
    next(error);
  }
};

/**
 * Actualizar un tipo de usuario por su ID
 */
const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updatedTipoUsuario = await updateTiposUsuario(id, req.body);
    if (!updatedTipoUsuario) {
      res
        .status(404)
        .json({ ok: false, message: "Tipo de usuario no encontrado." });
      return;
    }
    res.status(200).json({ ok: true, data: updatedTipoUsuario });
  } catch (error) {
    next(error);
  }
};

/**
 * Eliminar un tipo de usuario por su ID
 */
const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const tipoUsuarioEliminado = await deleteTiposUsuario(id);
    if (!tipoUsuarioEliminado) {
      res
        .status(404)
        .json({ ok: false, message: "Tipo de usuario no encontrado." });
      return;
    }
    res.status(200).json({ ok: true, message: "Tipo de usuario eliminado." });
  } catch (error) {
    next(error);
  }
};

export const TiposUsuarioController = {
  getAll,
  getById,
  create,
  update,
  remove,
};
