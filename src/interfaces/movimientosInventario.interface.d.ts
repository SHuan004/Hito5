export interface MovimientosInventarioAttributes {
  id_movimiento?: string;
  id_lote: string; // FK => Lotes
  fecha_movimiento: Date;
  tipo_movimiento: string; // 'INGRESO', 'EGRESO', 'AJUSTE', etc.
  cantidad: number;
  id_usuario: string; // FK => Usuarios
  rut_usuario: string;
  username_usuario: string;
}
