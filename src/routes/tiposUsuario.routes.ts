import { Router } from "express";
import { TiposUsuarioController } from "../controllers/tiposUsuario.controller";
import { verifyToken } from "../middlewares/authJwt";

export const tiposUsuarioRouter = Router();

tiposUsuarioRouter.get("/", verifyToken, TiposUsuarioController.getAll);
tiposUsuarioRouter.get("/:id", verifyToken, TiposUsuarioController.getById);
tiposUsuarioRouter.post("/", verifyToken, TiposUsuarioController.create);
tiposUsuarioRouter.put("/:id", verifyToken, TiposUsuarioController.update);
tiposUsuarioRouter.delete("/:id", verifyToken, TiposUsuarioController.remove);
