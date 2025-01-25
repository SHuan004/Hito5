import { Request, Response, NextFunction } from "express";
import {
  getAllMovimientosInventario,
  getMovimientoInventarioById,
  createMovimientoInventario,
  updateMovimientoInventario,
  deleteMovimientoInventario,
} from "../services/movimientosInventario.service";

/**
 * Obtener todos los movimientos de inventario
 */
const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movimientos = await getAllMovimientosInventario();
    if (movimientos && movimientos.length > 0) {
      res.json({ ok: true, data: movimientos });
    } else {
      res.status(404).json({
        ok: false,
        message: "No se encontraron movimientos de inventario.",
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Obtener un movimiento de inventario por su ID
 */
const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const movimiento = await getMovimientoInventarioById(id);
    if (!movimiento) {
      res.status(404).json({
        ok: false,
        message: "Movimiento de inventario no encontrado.",
      });
      return;
    }
    res.status(200).json({ ok: true, data: movimiento });
  } catch (error) {
    next(error);
  }
};

/**
 * Crear un nuevo movimiento de inventario
 */
const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      id_lote,
      fecha_movimiento,
      tipo_movimiento,
      cantidad,
      id_usuario,
      rut_usuario,
      username_usuario,
    } = req.body;

    const nuevoMovimiento = await createMovimientoInventario({
      id_lote,
      fecha_movimiento,
      tipo_movimiento,
      cantidad,
      id_usuario,
      rut_usuario,
      username_usuario,
    });
    res.status(201).json({ ok: true, data: nuevoMovimiento });
  } catch (error) {
    next(error);
  }
};

/**
 * Actualizar un movimiento de inventario por su ID
 */
const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updatedMovimiento = await updateMovimientoInventario(id, req.body);
    if (!updatedMovimiento) {
      res.status(404).json({
        ok: false,
        message: "Movimiento de inventario no encontrado.",
      });
      return;
    }
    res.status(200).json({ ok: true, data: updatedMovimiento });
  } catch (error) {
    next(error);
  }
};

/**
 * Eliminar un movimiento de inventario por su ID
 */
const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const movimientoEliminado = await deleteMovimientoInventario(id);
    if (!movimientoEliminado) {
      res.status(404).json({
        ok: false,
        message: "Movimiento de inventario no encontrado.",
      });
      return;
    }
    res
      .status(200)
      .json({ ok: true, message: "Movimiento de inventario eliminado." });
  } catch (error) {
    next(error);
  }
};

export const MovimientosInventarioController = {
  getAll,
  getById,
  create,
  update,
  remove,
};
