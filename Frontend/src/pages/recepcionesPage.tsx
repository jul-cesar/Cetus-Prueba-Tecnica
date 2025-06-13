import { getRecepciones } from "@/api/Recepciones";
import { columns } from "@/components/recepciones/columns";
import { DataTable } from "@/components/recepciones/data-table";
import { ReceptionDialog } from "@/components/recepciones/reception-dialog";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function ReceptionsPage() {
  const [open, setOpen] = useState(false);

  const { data: receptions = [], isLoading } = useQuery({
    queryKey: ["receptions"],
    queryFn: () => getRecepciones(),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Recepciones</h1>
          <p className="text-muted-foreground">
            Gestiona las recepciones de productos por proveedor
          </p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Recepción
        </Button>
      </div>

      <DataTable columns={columns} data={receptions} isLoading={isLoading} />

      <ReceptionDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
