import { MovimientosInventario } from "../models/movimientosInventario.model";
import { MovimientosInventarioAttributes } from "../interfaces/movimientosInventario.interface";

/**
 * Obtener todos los movimientos de inventario
 */
export const getAllMovimientosInventario = async () => {
  return await MovimientosInventario.findAll({ include: ["lote", "usuario"] });
};

/**
 * Obtener un movimiento de inventario por su ID
 */
export const getMovimientoInventarioById = async (id: string) => {
  return await MovimientosInventario.findByPk(id, {
    include: ["lote", "usuario"],
  });
};

/**
 * Crear un nuevo movimiento de inventario
 */
export const createMovimientoInventario = async (
  movimientoData: MovimientosInventarioAttributes
) => {
  return await MovimientosInventario.create(movimientoData);
};

/**
 * Actualizar un movimiento de inventario por su ID
 */
export const updateMovimientoInventario = async (
  id: string,
  updatedData: Partial<MovimientosInventarioAttributes>
) => {
  const movimiento = await MovimientosInventario.findByPk(id);
  if (!movimiento) return null;

  if (updatedData.id_lote !== undefined)
    movimiento.id_lote = updatedData.id_lote;
  if (updatedData.fecha_movimiento !== undefined)
    movimiento.fecha_movimiento = updatedData.fecha_movimiento;
  if (updatedData.tipo_movimiento !== undefined)
    movimiento.tipo_movimiento = updatedData.tipo_movimiento;
  if (updatedData.cantidad !== undefined)
    movimiento.cantidad = updatedData.cantidad;
  if (updatedData.id_usuario !== undefined)
    movimiento.id_usuario = updatedData.id_usuario;
  if (updatedData.rut_usuario !== undefined)
    movimiento.rut_usuario = updatedData.rut_usuario;
  if (updatedData.username_usuario !== undefined)
    movimiento.username_usuario = updatedData.username_usuario;

  await movimiento.save();
  return movimiento;
};

/**
 * Eliminar un movimiento de inventario por su ID
 */
export const deleteMovimientoInventario = async (id: string) => {
  const movimiento = await MovimientosInventario.findByPk(id);
  if (!movimiento) return null;

  await movimiento.destroy();
  return movimiento;
};
