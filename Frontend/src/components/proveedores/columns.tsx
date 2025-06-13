import type { Proveedor } from "@/Types";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { ProviderActions } from "./provider-actions";

export const columns: ColumnDef<Proveedor>[] = [
  {
    accessorKey: "tipoIdentificacion",
    header: "Tipo ID",
    cell: ({ row }) => {
      const type = row.getValue("tipoIdentificacion") as string;
      const typeMap: Record<string, string> = {
        CEDULA: "Cédula",
        NIT: "NIT",
        CEDULA_EXTRANJERIA: "C. Extranjería",
        NIT_EXTRANJERIA: "NIT Extranjería",
      };
      return typeMap[type] || type;
    },
  },
  {
    accessorKey: "numeroIdentificacion",
    header: "Número ID",
  },
  {
    accessorKey: "nombre",
    header: "Nombre/Razón Social",
  },
  {
    accessorKey: "direccion",
    header: "Dirección",
  },
  {
    accessorKey: "nombreContacto",
    header: "Contacto",
  },
  {
    accessorKey: "celularContacto",
    header: "Teléfono",
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
    cell: ({ row }) => <ProviderActions provider={row.original} />,
  },
];
