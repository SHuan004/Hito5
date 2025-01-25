import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AllowNull,
  ForeignKey,
  BelongsTo,
  IsUUID,
  Default,
} from "sequelize-typescript";

import { Lotes } from "./lotes.model";
import { Usuarios } from "./usuarios.model";
import { MovimientosInventarioAttributes } from "../interfaces/movimientosInventario.interface";

@Table({
  tableName: "movimientos_inventario",
  timestamps: false,
})
export class MovimientosInventario extends Model<MovimientosInventarioAttributes> {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id_movimiento!: string;

  @IsUUID(4)
  @ForeignKey(() => Lotes)
  @AllowNull(false)
  @Column(DataType.UUID)
  id_lote!: string;

  @BelongsTo(() => Lotes)
  lote!: Lotes;

  @AllowNull(false)
  @Column(DataType.DATE)
  fecha_movimiento!: Date;

  @AllowNull(false)
  @Column(DataType.STRING(20))
  tipo_movimiento!: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  cantidad!: number;

  @IsUUID(4)
  @ForeignKey(() => Usuarios)
  @AllowNull(false)
  @Column(DataType.UUID)
  id_usuario!: string;

  @BelongsTo(() => Usuarios)
  usuario!: Usuarios;

  @AllowNull(false)
  @Column(DataType.STRING(20))
  rut_usuario!: string;

  @AllowNull(false)
  @Column(DataType.STRING(50))
  username_usuario!: string;
}
