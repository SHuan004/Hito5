import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  IsUUID,
  Default,
  AllowNull,
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
  declare id_movimiento: string;

  @IsUUID(4)
  @ForeignKey(() => Lotes)
  @AllowNull(false)
  @Column(DataType.UUID)
  declare id_lote: string;

  @BelongsTo(() => Lotes)
  declare lote: Lotes;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare tipo_movimiento: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare cantidad: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare fecha_movimiento: string;

  @IsUUID(4)
  @ForeignKey(() => Usuarios)
  @AllowNull(false)
  @Column(DataType.UUID)
  declare id_usuario: string;

  @BelongsTo(() => Usuarios)
  declare usuario: Usuarios;

  @AllowNull(false)
  @Column(DataType.STRING(20))
  declare rut_usuario: string;

  @AllowNull(false)
  @Column(DataType.STRING(50))
  declare username_usuario: string;
}
