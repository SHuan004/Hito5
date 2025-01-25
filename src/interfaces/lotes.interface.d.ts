export interface LotesAttributes {
  id_lote?: string;
  id_medicamento: string; // FK => Medicamentos
  codigo_lote?: string;
  fecha_vencimiento: Date;
  cantidad_cajas: number;
  unidades_por_caja: number;
  stock_actual: number;
}
