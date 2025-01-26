import { Router } from "express";
import { LotesController } from "../controllers/lotes.controller";
import { verifyToken } from "../middlewares/authJwt";

export const lotesRouter = Router();

lotesRouter.get(
  "/por-vencer",
  verifyToken,
  LotesController.getLotesPorVencerController
);
lotesRouter.get("/", verifyToken, LotesController.getAll);
lotesRouter.get("/:id", verifyToken, LotesController.getById);
lotesRouter.post("/", verifyToken, LotesController.create);
lotesRouter.put("/:id", verifyToken, LotesController.update);
lotesRouter.delete("/:id", verifyToken, LotesController.remove);
