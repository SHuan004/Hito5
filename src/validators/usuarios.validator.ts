import Joi from "joi";

export const updateUsuarioSchema = Joi.object({
  rut: Joi.string().trim().optional(),
  username: Joi.string().min(3).max(50).optional(),
  nombre: Joi.string().min(3).max(50).optional(),
  apellido: Joi.string().min(3).max(50).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6),
  id_tipo_usuario: Joi.string().uuid().optional(),
});
