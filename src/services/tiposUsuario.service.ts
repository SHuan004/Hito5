import { TiposUsuario } from "../models/tiposUsuario.models";
import { TiposUsuarioAttributes } from "../interfaces/tiposUsuario.interface";

/**
 * Obtener todos los tipos de usuario
 */
export const getAllTiposUsuario = async () => {
  return await TiposUsuario.findAll();
};

/**
 * Obtener un tipo de usuario por su ID
 */
export const getTiposUsuarioById = async (id: string) => {
  return await TiposUsuario.findByPk(id);
};

/**
 * Crear un nuevo tipo de usuario
 */
export const createTiposUsuario = async (
  tipoUsuarioData: TiposUsuarioAttributes
) => {
  return await TiposUsuario.create(tipoUsuarioData);
};

/**
 * Actualizar un tipo de usuario por su ID
 */
export const updateTiposUsuario = async (
  id: string,
  updatedData: Partial<TiposUsuarioAttributes>
) => {
  const tipoUsuario = await TiposUsuario.findByPk(id);
  if (!tipoUsuario) return null;

  if (updatedData.nombre !== undefined) tipoUsuario.nombre = updatedData.nombre;

  await tipoUsuario.save();
  return tipoUsuario;
};

/**
 * Eliminar un tipo de usuario por su ID
 */
export const deleteTiposUsuario = async (id: string) => {
  const tipoUsuario = await TiposUsuario.findByPk(id);
  if (!tipoUsuario) return null;

  await tipoUsuario.destroy();
  return tipoUsuario;
};
