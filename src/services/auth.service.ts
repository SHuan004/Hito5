// src/services/auth.service.ts
import { findExistingUser, createUser, findByEmail } from "./usuarios.service"; // Importar funciones individuales
import { UsuariosAttributes } from "../interfaces/usuarios.interface";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

/**
 * Registro de un nuevo usuario, valida si ya existe y genera un token JWT.
 */
export const signupUser = async (userData: UsuariosAttributes) => {
  const { rut, email, username, password } = userData;

  // Verificar si el usuario ya existe
  const existe = await findExistingUser(rut, email, username);
  if (existe) {
    throw new Error("El usuario (email, rut o username) ya existe");
  }

  // Crear el usuario
  const nuevoUsuario = await createUser(userData);

  // Generar un token
  const token = generarToken({
    uid: nuevoUsuario.id_usuario,
    email: nuevoUsuario.email,
  });

  return { user: nuevoUsuario, token };
};

/**
 * Inicia sesión y devuelve un token JWT si las credenciales son correctas.
 */
export const signinUser = async (email: string, password: string) => {
  // Buscar el usuario por email
  const usuario = await findByEmail(email);
  if (!usuario) {
    throw new Error("Usuario no encontrado");
  }

  // Verificar que el usuario tenga una contraseña válida
  if (!usuario.password) {
    throw new Error("La contraseña no está configurada para este usuario");
  }

  // Comparar contraseñas
  const coincide = await bcrypt.compare(password, usuario.password);
  if (!coincide) {
    throw new Error("Credenciales inválidas");
  }

  // Generar un token
  const token = generarToken({
    uid: usuario.id_usuario,
    email: usuario.email,
  });

  return { user: usuario, token };
};

interface Payload {
  uid: string;
  email: string;
}
/**
 * Generar un token JWT
 */
const generarToken = (payload: Payload): string => {
  const secret = process.env.JWT_SECRET || "MiSecreto";
  return jwt.sign(payload, secret, { expiresIn: "1d" });
};
