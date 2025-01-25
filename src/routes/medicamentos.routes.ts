import { Router } from "express";
import { MedicamentosController } from "../controllers/medicamentos.controller";
import { verifyToken } from "../middlewares/authJwt";

export const medicamentosRouter = Router();

medicamentosRouter.get("/", verifyToken, MedicamentosController.getAll);
medicamentosRouter.get("/:id", verifyToken, MedicamentosController.getById);
medicamentosRouter.post("/", verifyToken, MedicamentosController.create);
medicamentosRouter.put("/:id", verifyToken, MedicamentosController.update);
medicamentosRouter.delete("/:id", verifyToken, MedicamentosController.remove);
