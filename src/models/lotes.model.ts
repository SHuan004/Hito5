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

@Table({
  tableName: "lotes",
  timestamps: false,
})
export class Lotes extends Model<LotesAttributes> {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id_lote!: string;

  @IsUUID(4)
  @ForeignKey(() => Medicamentos)
  @AllowNull(false)
  @Column(DataType.UUID)
  id_medicamento!: string;

  @BelongsTo(() => Medicamentos)
  medicamento!: Medicamentos;

  @Column(DataType.STRING(50))
  codigo_lote?: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  fecha_vencimiento!: Date;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  cantidad_cajas!: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  unidades_por_caja!: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  stock_actual!: number;
}
