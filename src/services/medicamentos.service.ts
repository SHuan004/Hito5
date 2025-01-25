import { Medicamentos } from "../models/medicamentos.models";
import { MedicamentosAttributes } from "../interfaces/medicamentos.interface";

/**
 * Obtener todos los medicamentos
 */
export const getAllMedicamentos = async () => {
  return await Medicamentos.findAll();
};

/**
 * Obtener un medicamento por su ID
 */
export const getMedicamentoById = async (id: string) => {
  return await Medicamentos.findByPk(id);
};

/**
 * Crear un nuevo medicamento
 */
export const createMedicamento = async (
  medicamentoData: MedicamentosAttributes
) => {
  return await Medicamentos.create(medicamentoData);
};

/**
 * Actualizar un medicamento por su ID
 */
export const updateMedicamento = async (
  id: string,
  updatedData: Partial<MedicamentosAttributes>
) => {
  const medicamento = await Medicamentos.findByPk(id);
  if (!medicamento) return null;

  if (updatedData.nombre !== undefined) medicamento.nombre = updatedData.nombre;
  if (updatedData.descripcion !== undefined)
    medicamento.descripcion = updatedData.descripcion;
  if (updatedData.presentacion !== undefined)
    medicamento.presentacion = updatedData.presentacion;
  if (updatedData.concentracion !== undefined)
    medicamento.concentracion = updatedData.concentracion;

  await medicamento.save();
  return medicamento;
};

/**
 * Eliminar un medicamento por su ID
 */
export const deleteMedicamento = async (id: string) => {
  const medicamento = await Medicamentos.findByPk(id);
  if (!medicamento) return null;

  await medicamento.destroy();
  return medicamento;
};
