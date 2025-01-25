import Joi from "joi";

export const signupSchema = Joi.object({
  rut: Joi.string().trim().required(),
  username: Joi.string().min(3).max(50).required(),
  nombre: Joi.string().min(3).max(50).required(),
  apellido: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  id_tipo_usuario: Joi.string().uuid().required(), // si usas UUID
});

export const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
