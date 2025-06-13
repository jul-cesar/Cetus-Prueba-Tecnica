import type { Recepcion } from "@/Types";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ReceptionActions } from "./reception-actions";

export const columns: ColumnDef<Recepcion>[] = [
  {
    accessorKey: "fechaHora",
    header: "Fecha",
    cell: ({ row }) => {
      const date = new Date(row.getValue("fechaHora"));
      return format(date, "dd/MM/yyyy HH:mm", { locale: es });
    },
  },
  {
    id: "prodName",
    accessorKey: "producto.nombre",
    header: "Producto",
    accessorFn: (row) => row.producto?.nombre || "N/A",
  },
  {
    id: "proveedorName",
    accessorKey: "proveedor.nombre",
    header: "Proveedor",
    accessorFn: (row) => row.proveedor?.nombre || "N/A",
  },
  {
    accessorKey: "registroINVIMA",
    header: "INVIMA",
  },
  {
    accessorKey: "cantidad",
    header: "Cantidad",
  },
  {
    accessorKey: "lote",
    header: "Lote",
  },
  {
    accessorKey: "fechaVencimiento",
    header: "Vencimiento",
    cell: ({ row }) => {
      const date = new Date(row.getValue("fechaVencimiento"));
      return format(date, "dd/MM/yyyy", { locale: es });
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ReceptionActions reception={row.original} />,
  },
];
