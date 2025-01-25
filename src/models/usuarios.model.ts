import {
  Model,
  Column,
  DataType,
  PrimaryKey,
  IsUUID,
  Default,
  BeforeCreate,
  BeforeUpdate,
  Table,
} from "sequelize-typescript";
import bcrypt from "bcryptjs";
import { UsuariosAttributes } from "../interfaces/usuarios.interface";

@Table({ tableName: "usuarios", timestamps: false })
export class Usuarios extends Model<UsuariosAttributes> {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id_usuario: string;

  @Column(DataType.STRING)
  declare rut: string;

  @Column(DataType.STRING)
  declare username: string;

  @Column(DataType.STRING)
  declare nombre: string;

  @Column(DataType.STRING)
  declare apellido: string;

  @Column(DataType.STRING)
  declare email: string;

  @Column(DataType.STRING)
  declare password: string;

  @Column(DataType.STRING)
  declare id_tipo_usuario: string;

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(usuario: Usuarios) {
    if (usuario.password) {
      console.log("Hashing password for:", usuario.email);
      usuario.password = await bcrypt.hash(usuario.password, 10);
    }
  }
}
