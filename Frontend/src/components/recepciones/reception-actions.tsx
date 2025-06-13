import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Recepcion } from "@/Types";

import { deleteRecepcion } from "@/api/Recepciones";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Edit, FileText, MoreHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ReceptionDialog } from "./reception-dialog";

interface ReceptionActionsProps {
  reception: Recepcion;
}

export function ReceptionActions({ reception }: ReceptionActionsProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: deleteReceptionMutation } = useMutation({
    mutationFn: (id: string) => {
      return deleteRecepcion(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["receptions"] });
      toast("La recepción ha sido eliminada correctamente");
    },
  });

  const handleDelete = () => {
    deleteReceptionMutation(reception.id);
    setShowDeleteDialog(false);
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
          <DropdownMenuItem onClick={() => setShowDetailsDialog(true)}>
            <FileText className="mr-2 h-4 w-4" />
            Ver detalles
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            className="text-destructive focus:text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ReceptionDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        reception={reception}
      />

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente
              la recepción del producto {reception.producto.nombre} de tu
              sistema.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalles de la Recepción</DialogTitle>
            <DialogDescription>
              Información detallada de la recepción del producto.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="font-medium">Fecha de Recepción:</div>
              <div>
                {format(new Date(reception.fechaHora), "dd/MM/yyyy HH:mm", {
                  locale: es,
                })}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="font-medium">Producto:</div>
              <div>{reception.producto.nombre}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="font-medium">Código del Producto:</div>
              <div>{reception.producto.codigo}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="font-medium">Laboratorio:</div>
              <div>{reception.producto.nombreLaboratorio}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="font-medium">Proveedor:</div>
              <div>{reception.proveedor.nombre}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="font-medium">Número de Factura:</div>
              <div>{reception.id}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="font-medium">Cantidad:</div>
              <div>{reception.cantidad}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="font-medium">Lote:</div>
              <div>{reception.lote}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="font-medium">Registro INVIMA:</div>
              <div>{reception.registroINVIMA}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="font-medium">Fecha de Vencimiento:</div>
              <div>
                {format(new Date(reception.fechaVencimiento), "dd/MM/yyyy", {
                  locale: es,
                })}
              </div>
            </div>
            <div>
              <div className="font-medium mb-1">Estado de Presentación:</div>
              <div className="border rounded-md p-2 text-sm">
                {reception.productoEstadoDescripcion}
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setShowDetailsDialog(false)}>Cerrar</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
