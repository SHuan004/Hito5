import { Request, Response, NextFunction } from "express";
import { signupUser, signinUser } from "../services/auth.service";

/**
 * Registro de un nuevo usuario
 */
const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      rut,
      username,
      nombre,
      apellido,
      email,
      password,
      id_tipo_usuario,
    } = req.body;

    const { user, token } = await signupUser({
      rut,
      username,
      nombre,
      apellido,
      email,
      password,
      id_tipo_usuario,
    });

    res.status(201).json({
      ok: true,
      data: { user, token },
    });
  } catch (error: any) {
    console.error(error);
    next(error); // Pasar el error al middleware global
  }
};

/**
 * Inicio de sesión
 */
const signin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await signinUser(email, password);

    res.json({
      ok: true,
      data: { user, token },
    });
  } catch (error: any) {
    console.error(error);
    next(error); // Pasar el error al middleware global
  }
};

/**
 * Exportar funciones como un objeto
 */
export const AuthController = {
  signup,
  signin,
};
