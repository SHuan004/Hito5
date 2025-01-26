import { Request, Response, NextFunction } from "express";
import {
  getAllLotes,
  getLoteById,
  createLote,
  updateLote,
  deleteLote,
  getLotesPorVencer,
} from "../services/lotes.service";

/**
 * Obtener todos los lotes
 */
const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lotes = await getAllLotes();
    if (lotes && lotes.length > 0) {
      res.json({ ok: true, data: lotes });
    } else {
      res.status(404).json({ ok: false, message: "No se encontraron lotes." });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Obtener un lote por su ID
 */
const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const lote = await getLoteById(id);
    if (!lote) {
      res.status(404).json({ ok: false, message: "Lote no encontrado." });
      return;
    }
    res.status(200).json({ ok: true, data: lote });
  } catch (error) {
    next(error);
  }
};

/**
 * Crear un nuevo lote
 */
const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      id_medicamento,
      codigo_lote,
      fecha_vencimiento,
      cantidad_cajas,
      unidades_por_caja,
      stock_actual,
    } = req.body;

    const nuevoLote = await createLote({
      id_medicamento,
      codigo_lote,
      fecha_vencimiento,
      cantidad_cajas,
      unidades_por_caja,
      stock_actual,
    });
    res.status(201).json({ ok: true, data: nuevoLote });
  } catch (error) {
    next(error);
  }
};

/**
 * Actualizar un lote por su ID
 */
const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updatedLote = await updateLote(id, req.body);
    if (!updatedLote) {
      res.status(404).json({ ok: false, message: "Lote no encontrado." });
      return;
    }
    res.status(200).json({ ok: true, data: updatedLote });
  } catch (error) {
    next(error);
  }
};

/**
 * Eliminar un lote por su ID
 */
const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const loteEliminado = await deleteLote(id);
    if (!loteEliminado) {
      res.status(404).json({ ok: false, message: "Lote no encontrado." });
      return;
    }
    res.status(200).json({ ok: true, message: "Lote eliminado." });
  } catch (error) {
    next(error);
  }
};

const getLotesPorVencerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dias = parseInt(req.query.dias as string, 10) || 30;
    const lotes = await getLotesPorVencer(dias);
    if (lotes.length === 0) {
      res.status(404).json({ ok: false, message: "No hay lotes por vencer." });
      return;
    }
    res.json({ ok: true, data: lotes });
  } catch (error) {
    next(error);
  }
};

export const LotesController = {
  getAll,
  getById,
  create,
  update,
  remove,
  getLotesPorVencerController,
};
