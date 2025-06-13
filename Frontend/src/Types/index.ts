type Estado = "Activo" | "Inactivo";

export type Product = {
  id: string;
  codigo: string;
  nombre: string;
  descripcion: string;
  nombreLaboratorio: string;
  estado: Estado;
};

export type InsertProduct = Omit<Product, "id">;

export type Proveedor = {
  id: string;
  tipoIdentificacion: string;
  numeroIdentificacion: string;
  nombre: string;
  direccion: string;
  nombreContacto: string;
  celularContacto: string;
  estado: Estado;
};

export type InsertProveedor = Omit<Proveedor, "id">;

export type Recepcion = {
  proveedor: {
    id: string;
    tipoIdentificacion: string;
    numeroIdentificacion: string;
    nombre: string;
    direccion: string;
    nombreContacto: string;
    celularContacto: string;
    estado: string;
  };
  producto: {
    id: string;
    nombre: string;
    estado: Estado;
    codigo: string;
    descripcion: string;
    nombreLaboratorio: string;
  };
} & {
  cantidad: number;
  lote: string;
  registroINVIMA: string;
  fechaVencimiento: Date;
  productoEstadoDescripcion: string;
  proveedorId: string;
  productoId: string;
  id: string;
  fechaHora: Date;
};

export type InsertRecepcion = Omit<
  Recepcion,
  "id" | "fechaHora" | "proveedor" | "producto"
  >;
