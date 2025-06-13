"use client";

import { toggleProveedorStatus } from "@/api/Proveedores";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Proveedor } from "@/Types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, Edit, MoreHorizontal, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ProviderDialog } from "./provider-dialog";

interface ProviderActionsProps {
  provider: Proveedor;
}

export function ProviderActions({ provider }: ProviderActionsProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: toggleProviderStatusMutation } = useMutation({
    mutationFn: (id: string) => {
      return toggleProveedorStatus(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["providers"] });
      toast("El proveedor ha sido desactivado correctamente");
    },
  });

  const handleToggleStatus = () => {
    toggleProviderStatusMutation(provider.id);
    queryClient.invalidateQueries({ queryKey: ["providers"] });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menú</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleToggleStatus}
            className="text-destructive focus:text-destructive"
          >
            {provider.estado === "Activo" ? (
              <>
                <X className="mr-2 h-4 w-4" />
                Desactivar
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Activar
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ProviderDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        provider={provider}
      />
    </>
  );
}
