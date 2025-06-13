import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import type { Proveedor } from "@/Types";


export const columns: ColumnDef<Proveedor>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "tipoIdentificacion",
    header: "Tipo ID",
    cell: ({ row }) => {
      const type = row.getValue("identificationType") as string;
      const typeMap: Record<string, string> = {
        CC: "Cédula",
        NIT: "NIT",
        CE: "C. Extranjería",
        NE: "NIT Extranjería",
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
    id: "actions",
    cell: ({ row }) => <ProviderActions provider={row.original} />,
  },
];
