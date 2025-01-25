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
import { TiposUsuarioAttributes } from "../interfaces/tiposUsuario.interface";

@Table({
  tableName: "tipos_usuario",
  timestamps: false,
})
export class TiposUsuario extends Model<TiposUsuarioAttributes> {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id_tipo_usuario!: string;

  @AllowNull(false)
  @Column(DataType.STRING(50))
  nombre!: string;
}
