import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, Edit, MoreHorizontal, X } from "lucide-react";
import { useState } from "react";

import { toggleProductStatus } from "@/api/Productos";
import type { Product } from "@/Types";
import { toast } from "sonner";
import { ProductDialog } from "./product-dialog";

interface ProductActionsProps {
  product: Product;
}

export function ProductActions({ product }: ProductActionsProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: updateStatusMutation } = useMutation({
    mutationFn: (id: string) => {
      return toggleProductStatus(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast("El estado del producto ha sido actualizado correctamente");
    },
  });

  const handleStatusChange = () => {
    updateStatusMutation(product.id);
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
          <DropdownMenuItem onClick={handleStatusChange}>
            {product.estado === "Activo" ? (
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

      <ProductDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        product={product}
      />
    </>
  );
}
