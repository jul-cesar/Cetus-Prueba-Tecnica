export type Product = {
  id: string
  codigo: string
  nombre: string
  descripcion: string
  nombreLaboratorio: string
  estado: "Activo" | "Inactivo"
}

export type InsertProduct = Omit<Product, "id">

export type Proveedor = {
  id: string
  tipoIdentificacion: string
  numeroIdentificacion: string
  nombre: string
  direccion: string
  nombreContacto: string
  celularContacto: string
  estado: "Activo" | "Inactivo"
}

export type InsertProveedor = Omit<Proveedor, "id">


