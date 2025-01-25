import { Request, Response, NextFunction } from "express";
import {
  getAllMedicamentos,
  getMedicamentoById,
  createMedicamento,
  updateMedicamento,
  deleteMedicamento,
} from "../services/medicamentos.service";

/**
 * Obtener todos los medicamentos
 */
const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const medicamentos = await getAllMedicamentos();
    if (medicamentos && medicamentos.length > 0) {
      res.json({ ok: true, data: medicamentos });
    } else {
      res
        .status(404)
        .json({ ok: false, message: "No se encontraron medicamentos." });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Obtener un medicamento por su ID
 */
const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const medicamento = await getMedicamentoById(id);
    if (!medicamento) {
      res
        .status(404)
        .json({ ok: false, message: "Medicamento no encontrado." });
      return;
    }
    res.status(200).json({ ok: true, data: medicamento });
  } catch (error) {
    next(error);
  }
};

/**
 * Crear un nuevo medicamento
 */
const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { nombre, descripcion, presentacion, concentracion } = req.body;
    const nuevoMedicamento = await createMedicamento({
      nombre,
      descripcion,
      presentacion,
      concentracion,
    });
    res.status(201).json({ ok: true, data: nuevoMedicamento });
  } catch (error) {
    next(error);
  }
};

/**
 * Actualizar un medicamento por su ID
 */
const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updatedMedicamento = await updateMedicamento(id, req.body);
    if (!updatedMedicamento) {
      res
        .status(404)
        .json({ ok: false, message: "Medicamento no encontrado." });
      return;
    }
    res.status(200).json({ ok: true, data: updatedMedicamento });
  } catch (error) {
    next(error);
  }
};

/**
 * Eliminar un medicamento por su ID
 */
const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const medicamentoEliminado = await deleteMedicamento(id);
    if (!medicamentoEliminado) {
      res
        .status(404)
        .json({ ok: false, message: "Medicamento no encontrado." });
      return;
    }
    res.status(200).json({ ok: true, message: "Medicamento eliminado." });
  } catch (error) {
    next(error);
  }
};

export const MedicamentosController = {
  getAll,
  getById,
  create,
  update,
  remove,
};
