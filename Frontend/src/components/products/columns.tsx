import { Badge } from "@/components/ui/badge";
import type { Product } from "@/Types";

import type { ColumnDef } from "@tanstack/react-table";
import { ProductActions } from "./products-actions";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "codigo",
    header: "Código",
  },
  {
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    accessorKey: "descripcion",
    header: "Descripción",
  },
  {
    accessorKey: "nombreLaboratorio",
    header: "Laboratorio",
  },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.getValue("estado") as string;
      return (
        <Badge variant={status === "Activo" ? "default" : "destructive"}>
          {status === "Activo" ? "Activo" : "Inactivo"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ProductActions product={row.original} />,
  },
];
