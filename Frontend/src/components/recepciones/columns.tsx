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
    accessorKey: "producto.nombre",
    header: "Producto",
  },
  {
    accessorKey: "proveedor.nombre",
    header: "Proveedor",
  },
  {
    accessorKey: "registroINVIMA",
    header: "No. Factura",
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
