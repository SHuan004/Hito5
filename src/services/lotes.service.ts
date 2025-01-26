import { Lotes } from "../models/lotes.model";
import { LotesAttributes } from "../interfaces/lotes.interface";
import { Op } from "sequelize";

/**
 * Obtener todos los lotes
 */
export const getAllLotes = async () => {
  return await Lotes.findAll({ include: ["medicamento"] });
};

/**
 * Obtener un lote por su ID
 */
export const getLoteById = async (id: string) => {
  return await Lotes.findByPk(id, { include: ["medicamento"] });
};

/**
 * Crear un nuevo lote
 */
export const createLote = async (loteData: LotesAttributes) => {
  return await Lotes.create(loteData);
};

/**
 * Actualizar un lote por su ID
 */
export const updateLote = async (
  id: string,
  updatedData: Partial<LotesAttributes>
) => {
  const lote = await Lotes.findByPk(id);
  if (!lote) return null;

  if (updatedData.id_medicamento !== undefined)
    lote.id_medicamento = updatedData.id_medicamento;
  if (updatedData.codigo_lote !== undefined)
    lote.codigo_lote = updatedData.codigo_lote;
  if (updatedData.fecha_vencimiento !== undefined)
    lote.fecha_vencimiento = updatedData.fecha_vencimiento;
  if (updatedData.cantidad_cajas !== undefined)
    lote.cantidad_cajas = updatedData.cantidad_cajas;
  if (updatedData.unidades_por_caja !== undefined)
    lote.unidades_por_caja = updatedData.unidades_por_caja;
  if (updatedData.stock_actual !== undefined)
    lote.stock_actual = updatedData.stock_actual;

  await lote.save();
  return lote;
};

/**
 * Eliminar un lote por su ID
 */
export const deleteLote = async (id: string) => {
  const lote = await Lotes.findByPk(id);
  if (!lote) return null;

  await lote.destroy();
  return lote;
};

export const getLotesPorVencer = async (dias: number = 30) => {
  const hoy = new Date();
  const fechaLimite = new Date();
  fechaLimite.setDate(hoy.getDate() + dias);

  return await Lotes.findAll({
    where: {
      fecha_vencimiento: {
        [Op.between]: [hoy, fechaLimite],
      },
    },
    include: ["medicamento"],
  });
};
