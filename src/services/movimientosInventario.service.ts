import { MovimientosInventario } from "../models/movimientosInventario.model";
import { MovimientosInventarioAttributes } from "../interfaces/movimientosInventario.interface";
import { Lotes } from "../models/lotes.model";

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
 * Crear un nuevo movimiento de inventario y actualizar el stock del lote correspondiente
 */
export const createMovimientoInventario = async (
  movimientoData: MovimientosInventarioAttributes
) => {
  const { id_lote, tipo_movimiento, cantidad } = movimientoData;

  // Buscar el lote asociado
  const lote = await Lotes.findByPk(id_lote);
  if (!lote) {
    throw new Error("Lote no encontrado");
  }

  // Actualizar el stock en función del tipo de movimiento
  if (tipo_movimiento === "INGRESO") {
    lote.stock_actual += cantidad;
  } else if (tipo_movimiento === "RETIRO" && lote.stock_actual >= cantidad) {
    lote.stock_actual -= cantidad;
  } else {
    throw new Error("Stock insuficiente para el retiro");
  }

  await lote.save();

  // Crear el movimiento
  return await MovimientosInventario.create(movimientoData);
};

/**
 * Actualizar un movimiento de inventario por su ID y reflejar los cambios en el stock del lote
 */
export const updateMovimientoInventario = async (
  id: string,
  updatedData: Partial<MovimientosInventarioAttributes>
) => {
  const movimiento = await MovimientosInventario.findByPk(id);
  if (!movimiento) {
    throw new Error("Movimiento no encontrado");
  }

  const lote = await Lotes.findByPk(movimiento.id_lote);
  if (!lote) {
    throw new Error("Lote no encontrado");
  }

  // Revertir el stock original
  if (movimiento.tipo_movimiento === "INGRESO") {
    lote.stock_actual -= movimiento.cantidad;
  } else if (movimiento.tipo_movimiento === "RETIRO") {
    lote.stock_actual += movimiento.cantidad;
  }

  // Aplicar los cambios del nuevo movimiento
  if (updatedData.tipo_movimiento && updatedData.cantidad !== undefined) {
    if (updatedData.tipo_movimiento === "INGRESO") {
      lote.stock_actual += updatedData.cantidad;
    } else if (
      updatedData.tipo_movimiento === "RETIRO" &&
      lote.stock_actual >= updatedData.cantidad
    ) {
      lote.stock_actual -= updatedData.cantidad;
    } else {
      throw new Error("Stock insuficiente para el retiro");
    }
  }

  await lote.save();

  // Actualizar el movimiento
  return await movimiento.update(updatedData);
};

/**
 * Eliminar un movimiento de inventario por su ID y revertir el stock del lote
 */
export const deleteMovimientoInventario = async (id: string) => {
  const movimiento = await MovimientosInventario.findByPk(id);
  if (!movimiento) {
    throw new Error("Movimiento no encontrado");
  }

  const lote = await Lotes.findByPk(movimiento.id_lote);
  if (!lote) {
    throw new Error("Lote no encontrado");
  }

  // Revertir el stock según el tipo de movimiento
  if (movimiento.tipo_movimiento === "INGRESO") {
    lote.stock_actual -= movimiento.cantidad;
  } else if (movimiento.tipo_movimiento === "RETIRO") {
    lote.stock_actual += movimiento.cantidad;
  }

  await lote.save();

  // Eliminar el movimiento
  await movimiento.destroy();
  return movimiento;
};
