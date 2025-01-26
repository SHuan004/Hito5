import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AllowNull,
  Default,
  IsUUID,
} from "sequelize-typescript";
import { MedicamentosAttributes } from "../interfaces/medicamentos.interface";

@Table({ tableName: "medicamentos", timestamps: false })
export class Medicamentos extends Model<MedicamentosAttributes> {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id_medicamento: string;

  @AllowNull(false)
  @Column(DataType.STRING(100))
  declare nombre: string;

  @Column(DataType.STRING(255))
  declare descripcion?: string;

  @Column(DataType.STRING(50))
  declare presentacion?: string;

  @Column(DataType.STRING(50))
  declare concentracion?: string;
}
