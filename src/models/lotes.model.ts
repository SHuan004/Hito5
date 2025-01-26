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
import { Medicamentos } from "./medicamentos.models";
import { LotesAttributes } from "../interfaces/lotes.interface";

@Table({ tableName: "lotes", timestamps: false })
export class Lotes extends Model<LotesAttributes> {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id_lote: string;

  @IsUUID(4)
  @ForeignKey(() => Medicamentos)
  @AllowNull(false)
  @Column(DataType.UUID)
  declare id_medicamento: string;

  @BelongsTo(() => Medicamentos)
  declare medicamento: Medicamentos;

  @Column(DataType.STRING(50))
  declare codigo_lote?: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  declare fecha_vencimiento: Date;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare cantidad_cajas: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare unidades_por_caja: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare stock_actual: number;
}
