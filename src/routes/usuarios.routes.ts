import { Router } from "express";
import { UsuariosController } from "../controllers/usuarios.controller";
import { verifyToken } from "../middlewares/authJwt";

export const usuariosRouter = Router();

usuariosRouter.get("/", verifyToken, UsuariosController.getAll);
usuariosRouter.get("/:id", verifyToken, UsuariosController.getById);
usuariosRouter.post("/", verifyToken, UsuariosController.create);
usuariosRouter.put("/:id", verifyToken, UsuariosController.update);
usuariosRouter.delete("/:id", verifyToken, UsuariosController.remove);
