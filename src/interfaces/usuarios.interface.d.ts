export interface UsuariosAttributes {
  id_usuario?: string;
  rut: string;
  username: string;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  id_tipo_usuario: string; // FK a TiposUsuario
}
