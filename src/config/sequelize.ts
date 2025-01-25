import { Sequelize } from "sequelize-typescript";

// Importamos los modelos:
import { TiposUsuario } from "../models/tiposUsuario.models";
import { Usuarios } from "../models/usuarios.model";
import { Medicamentos } from "../models/medicamentos.models";
import { Lotes } from "../models/lotes.model";
import { MovimientosInventario } from "../models/movimientosInventario.model";

// Reemplaza la URL por la de tu base de datos:
const DATABASE =
  process.env.DATABASE_URL ||
  "postgres://postgres:root@localhost:5436/db_Hito5";

export const sequelize = new Sequelize(DATABASE, {
  dialect: "postgres",
  models: [TiposUsuario, Usuarios, Medicamentos, Lotes, MovimientosInventario],
});
