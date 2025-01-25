import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AllowNull,
  Unique,
  ForeignKey,
  BelongsTo,
  IsUUID,
  Default,
  BeforeCreate,
  BeforeUpdate,
} from "sequelize-typescript";
import bcrypt from "bcryptjs";

import { TiposUsuario } from "./tiposUsuario.models";
import { UsuariosAttributes } from "../interfaces/usuarios.interface";

@Table({
  tableName: "usuarios",
  timestamps: false,
})
export class Usuarios extends Model<UsuariosAttributes> {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id_usuario!: string;

  @AllowNull(false)
  @Column(DataType.STRING(20))
  rut!: string;

  @AllowNull(false)
  @Column(DataType.STRING(50))
  username!: string;

  @AllowNull(false)
  @Column(DataType.STRING(50))
  nombre!: string;

  @AllowNull(false)
  @Column(DataType.STRING(50))
  apellido!: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING(100))
  email!: string;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  password!: string;

  @IsUUID(4)
  @ForeignKey(() => TiposUsuario)
  @AllowNull(false)
  @Column(DataType.UUID)
  id_tipo_usuario!: string;

  @BelongsTo(() => TiposUsuario)
  tipo_usuario!: TiposUsuario;

  // HOOKS para encriptar la contraseña antes de crear/actualizar
  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(usuario: Usuarios) {
    if (usuario.password) {
      usuario.password = await bcrypt.hash(usuario.password, 10);
    }
  }
}
