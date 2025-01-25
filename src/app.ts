import express, { Request, Response, NextFunction } from "express";
import { usuariosRouter } from "./routes/usuarios.routes";
import { authRouter } from "./routes/auth.routes";
import { tiposUsuarioRouter } from "./routes/tiposUsuario.routes";
import { medicamentosRouter } from "./routes/medicamentos.routes";
import { lotesRouter } from "./routes/lotes.routes";
import { movimientosInventarioRouter } from "./routes/movimientosInventario.routes";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
dotenv.config();

// Rutas
app.use("/api/usuarios", usuariosRouter);
app.use("/api/auth", authRouter);
app.use("/api/tipos", tiposUsuarioRouter);
app.use("/api/medicamentos", medicamentosRouter);
app.use("/api/lotes", lotesRouter);
app.use("/api/movimientos", movimientosInventarioRouter);

// Middleware global de manejo de errores
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ ok: false, message: "Internal Server Error", error: err.message });
});

export default app;
