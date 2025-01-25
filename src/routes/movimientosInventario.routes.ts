import { Router } from "express";
import { MovimientosInventarioController } from "../controllers/movimientosInventario.controller";
import { verifyToken } from "../middlewares/authJwt";

export const movimientosInventarioRouter = Router();

movimientosInventarioRouter.get(
  "/",
  verifyToken,
  MovimientosInventarioController.getAll
);
movimientosInventarioRouter.get(
  "/:id",
  verifyToken,
  MovimientosInventarioController.getById
);
movimientosInventarioRouter.post(
  "/",
  verifyToken,
  MovimientosInventarioController.create
);
movimientosInventarioRouter.put(
  "/:id",
  verifyToken,
  MovimientosInventarioController.update
);
movimientosInventarioRouter.delete(
  "/:id",
  verifyToken,
  MovimientosInventarioController.remove
);
