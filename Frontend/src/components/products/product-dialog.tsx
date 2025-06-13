import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type { Product } from "@/Types";
import { createProduct, updateProduct } from "@/api/Productos";
import { toast } from "sonner";

const productSchema = z.object({
  code: z.string().min(1, "El código es requerido"),
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  laboratory: z.string().min(1, "El laboratorio es requerido"),
  status: z.enum(["Activo", "Inactivo"]),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product;
}

export function ProductDialog({
  open,
  onOpenChange,
  product,
}: ProductDialogProps) {
  const isEditing = !!product;
  const queryClient = useQueryClient();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      code: product?.codigo || "",
      name: product?.nombre || "",
      description: product?.descripcion || "",
      laboratory: product?.nombreLaboratorio || "",
      status: product?.estado || "Activo",
    },
  });

  const { mutate: createProductMutation, isPending: isCreating } = useMutation({
    mutationFn: (data: ProductFormValues) => {
      return createProduct({
        codigo: data.code,
        nombre: data.name,
        descripcion: data.description,
        nombreLaboratorio: data.laboratory,
        estado: data.status === "Activo" ? "Activo" : "Inactivo",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast("El producto ha sido creado correctamente");
      onOpenChange(false);
      form.reset();
    },
    onError: (error: any) => {
      toast.error(`Error al crear el producto: ${error}`);
    },
  });

  const { mutate: updateProductMutation, isPending: isUpdating } = useMutation({
    mutationFn: (data: ProductFormValues & { id: string }) => {
      return updateProduct({
        id: data.id,
        codigo: data.code,
        nombre: data.name,
        descripcion: data.description,
        nombreLaboratorio: data.laboratory,
        estado: data.status === "Activo" ? "Activo" : "Inactivo",
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast("El producto ha sido actualizado correctamente");
      onOpenChange(false);
    },
  });

  const onSubmit = (data: ProductFormValues) => {
    if (isEditing && product) {
      updateProductMutation({ id: product.id, ...data });
    } else {
      createProductMutation(data);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar producto" : "Nuevo producto"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Edita los detalles del producto existente."
              : "Completa los detalles para crear un nuevo producto."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código</FormLabel>
                  <FormControl>
                    <Input placeholder="Código del producto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre del producto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descripción del producto"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="laboratory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Laboratorio</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre del laboratorio" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un estado" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Activo">Activo</SelectItem>
                      <SelectItem value="Inactivo">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isCreating || isUpdating}>
                {isEditing ? "Actualizar" : "Crear"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
