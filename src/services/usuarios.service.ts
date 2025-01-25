import { Usuarios } from "../models/usuarios.model";
import { Op } from "sequelize";
import { UsuariosAttributes } from "../interfaces/usuarios.interface";

/**
 * Crear un nuevo usuario
 */
export const createUser = async (userData: UsuariosAttributes) => {
  const nuevoUsuario = await Usuarios.create(userData);
  return nuevoUsuario;
};

/**
 * Obtener todos los usuarios
 */
export const getAllUsers = async () => {
  return await Usuarios.findAll();
};

/**
 * Obtener un usuario por su ID (UUID)
 */
export const getUserById = async (id: string) => {
  return await Usuarios.findByPk(id);
};

/**
 * Buscar un usuario por email, rut o username (para validaciones)
 */
export const findExistingUser = async (
  rut: string,
  email: string,
  username: string
) => {
  return await Usuarios.findOne({
    where: {
      [Op.or]: [{ email }, { rut }, { username }],
    },
  });
};

/**
 * Buscar un usuario por email (para login)
 */
export const findByEmail = async (email: string) => {
  return await Usuarios.findOne({
    where: { email },
  });
};

/**
 * Actualizar datos de un usuario por su ID
 */
export const updateUser = async (
  id: string,
  updatedData: Partial<UsuariosAttributes>
) => {
  const usuario = await Usuarios.findByPk(id);
  if (!usuario) return null;

  // Mezclar los datos que se envían
  const { rut, username, nombre, apellido, email, password, id_tipo_usuario } =
    updatedData;

  if (rut !== undefined) usuario.rut = rut;
  if (username !== undefined) usuario.username = username;
  if (nombre !== undefined) usuario.nombre = nombre;
  if (apellido !== undefined) usuario.apellido = apellido;
  if (email !== undefined) usuario.email = email;
  if (password !== undefined) {
    // El hook BeforeUpdate en el modelo hashea automáticamente el password
    usuario.password = password;
  }
  if (id_tipo_usuario !== undefined) usuario.id_tipo_usuario = id_tipo_usuario;

  await usuario.save();
  return usuario;
};

/**
 * Eliminar un usuario por su ID
 */
export const deleteUser = async (id: string) => {
  const usuario = await Usuarios.findByPk(id);
  if (!usuario) return null;

  await usuario.destroy();
  return usuario;
};
