import { getProveedores } from "@/api/Proveedores";
import { columns } from "@/components/proveedores/columns";
import { DataTable } from "@/components/proveedores/data-table";
import { ProviderDialog } from "@/components/proveedores/provider-dialog";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function ProvidersPage() {
  const [open, setOpen] = useState(false);

  const { data: providers = [], isLoading } = useQuery({
    queryKey: ["providers"],
    queryFn: () => getProveedores(),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Proveedores</h1>
          <p className="text-muted-foreground">
            Gestiona los proveedores de tu empresa
          </p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Proveedor
        </Button>
      </div>

      <DataTable columns={columns} data={providers} isLoading={isLoading} />

      <ProviderDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
