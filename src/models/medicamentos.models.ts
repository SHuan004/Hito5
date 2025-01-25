import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AllowNull,
  IsUUID,
  Default,
} from "sequelize-typescript";
import { MedicamentosAttributes } from "../interfaces/medicamentos.interface";

@Table({
  tableName: "medicamentos",
  timestamps: false,
})
export class Medicamentos extends Model<MedicamentosAttributes> {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id_medicamento!: string;

  @AllowNull(false)
  @Column(DataType.STRING(100))
  nombre!: string;

  @Column(DataType.STRING(255))
  descripcion?: string;

  @Column(DataType.STRING(50))
  presentacion?: string;

  @Column(DataType.STRING(50))
  concentracion?: string;
}
