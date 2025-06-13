import { getProducts } from "@/api/Productos";
import { getProveedores } from "@/api/Proveedores";
import { createRecepcion, updateRecepcion } from "@/api/Recepciones";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { cn } from "@/lib/utils";
import type { InsertRecepcion, Product, Proveedor, Recepcion } from "@/Types";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const receptionSchema = z.object({
  productId: z.string().min(1, "El producto es requerido"),
  providerId: z.string().min(1, "El proveedor es requerido"),
  invoiceNumber: z.string().min(1, "El número de factura es requerido"),

  quantity: z.coerce.number().positive("La cantidad debe ser mayor a 0"),
  batch: z.string().min(1, "El lote es requerido"),
  invimaRegistration: z.string().min(1, "El registro INVIMA es requerido"),
  expirationDate: z.date({
    required_error: "La fecha de vencimiento es requerida",
  }),
  presentationState: z
    .string()
    .min(1, "La descripción del estado es requerida"),
});

type ReceptionFormValues = z.infer<typeof receptionSchema>;

interface ReceptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reception?: Recepcion;
}

export function ReceptionDialog({
  open,
  onOpenChange,
  reception,
}: ReceptionDialogProps) {
  const isEditing = !!reception;
  const queryClient = useQueryClient();

  const { data: products = [] } = useQuery({
    queryKey: ["products-select"],
    queryFn: () => getProducts(),
    enabled: open,
  });

  const { data: providers = [] } = useQuery({
    queryKey: ["providers-select"],
    queryFn: () => getProveedores(),
    enabled: open,
  });

  const form = useForm<ReceptionFormValues>({
    resolver: zodResolver(receptionSchema),
    defaultValues: {
      productId: reception?.producto?.id || "",
      providerId: reception?.proveedor?.id || "",
      invoiceNumber: reception?.id || "",
      quantity: reception?.cantidad || 0,
      batch: reception?.lote || "",
      invimaRegistration: reception?.registroINVIMA || "",
      expirationDate: reception?.fechaVencimiento
        ? new Date(reception.fechaVencimiento)
        : undefined,
      presentationState: reception?.productoEstadoDescripcion || "",
    },
  });

  const { mutate: createReceptionMutation, isPending: isCreating } =
    useMutation({
      mutationFn: (data: InsertRecepcion) => {
        return createRecepcion(data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["receptions"] });
        toast("La recepción ha sido creada correctamente");
        onOpenChange(false);
        form.reset();
      },
    });

  const { mutate: updateReceptionMutation, isPending: isUpdating } =
    useMutation({
      mutationFn: (data: InsertRecepcion & { id: string }) => {
        return updateRecepcion(data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["receptions"] });
        toast("La recepción ha sido actualizada correctamente");
        onOpenChange(false);
      },
    });

  const onSubmit = (data: ReceptionFormValues) => {
    if (isEditing && reception) {
      updateReceptionMutation({
        id: reception.id,
        proveedorId: data.providerId,
        productoId: data.productId,
        numeroFactura: data.invoiceNumber,
        cantidad: data.quantity,
        lote: data.batch,
        registroINVIMA: data.invimaRegistration,
        fechaVencimiento: data.expirationDate,
        productoEstadoDescripcion: data.presentationState,
      });
    } else {
      createReceptionMutation({
        cantidad: data.quantity,
        lote: data.batch,
        numeroFactura: data.invoiceNumber,
        fechaVencimiento: data.expirationDate,
        registroINVIMA: data.invimaRegistration,
        productoEstadoDescripcion: data.presentationState,
        proveedorId: data.providerId,
        productoId: data.productId,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar recepción" : "Nueva recepción"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Edita los detalles de la recepción existente."
              : "Completa los detalles para crear una nueva recepción."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="productId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Producto</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un producto" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {products.map((product: Product) => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="providerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Proveedor</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un proveedor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {providers.map((provider: Proveedor) => (
                          <SelectItem key={provider.id} value={provider.id}>
                            {provider.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="invoiceNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de Factura</FormLabel>
                    <FormControl>
                      <Input placeholder="Número de factura" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cantidad</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Cantidad" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="batch"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lote</FormLabel>
                    <FormControl>
                      <Input placeholder="Lote" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="invimaRegistration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registro INVIMA</FormLabel>
                    <FormControl>
                      <Input placeholder="Registro INVIMA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="expirationDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Fecha de Vencimiento</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "dd/MM/yyyy", { locale: es })
                          ) : (
                            <span>Selecciona una fecha</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        captionLayout="dropdown-years"
                        fromYear={new Date().getFullYear()}
                        toYear={new Date().getFullYear() + 10}
                        showOutsideDays={false}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="presentationState"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado de Presentación</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descripción del estado de presentación del producto"
                      {...field}
                    />
                  </FormControl>
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
