import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { validateBody } from "../middlewares/validator.middleware";
import { signupSchema, signinSchema } from "../validators/auth.validator";

export const authRouter = Router();

// Registro: usamos validateBody con signupSchema
authRouter.post("/register", validateBody(signupSchema), AuthController.signup);

// Login: usamos validateBody con signinSchema
authRouter.post("/login", validateBody(signinSchema), AuthController.signin);
