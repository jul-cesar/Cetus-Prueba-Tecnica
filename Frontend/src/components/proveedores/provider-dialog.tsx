"use client";

import { createProveedor, updateProveedor } from "@/api/Proveedores";
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
import type { InsertProveedor, Proveedor } from "@/Types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const providerSchema = z.object({
  identificationType: z.enum([
    "CEDULA",
    "NIT",
    "CEDULA_EXTRANJERIA",

    "NIT_EXTRANJERIA",
  ]),
  identificationNumber: z
    .string()
    .min(1, "El número de identificación es requerido"),
  name: z.string().min(1, "El nombre o razón social es requerido"),
  address: z.string().min(1, "La dirección es requerida"),
  contactName: z.string().min(1, "El nombre de contacto es requerido"),
  contactPhone: z.string().min(1, "El teléfono de contacto es requerido"),
});

type ProviderFormValues = z.infer<typeof providerSchema>;

interface ProviderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  provider?: Proveedor;
}

export function ProviderDialog({
  open,
  onOpenChange,
  provider,
}: ProviderDialogProps) {
  const isEditing = !!provider;
  const queryClient = useQueryClient();

  const form = useForm<ProviderFormValues>({
    resolver: zodResolver(providerSchema),
    defaultValues: {
      identificationType:
        provider?.tipoIdentificacion as ProviderFormValues["identificationType"],
      identificationNumber: provider?.numeroIdentificacion,
      name: provider?.nombre || "",
      address: provider?.direccion || "",
      contactName: provider?.nombreContacto || "",
      contactPhone: provider?.celularContacto || "",
    },
  });

  const { mutate: createProviderMutation, isPending: isCreating } = useMutation(
    {
      mutationFn: (data: InsertProveedor) => {
        return createProveedor(data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["providers"] });
        toast("El proveedor ha sido creado correctamente");
        onOpenChange(false);
        form.reset();
      },
    }
  );

  const { mutate: updateProviderMutation, isPending: isUpdating } = useMutation(
    {
      mutationFn: (data: { id: string } & InsertProveedor) => {
        return updateProveedor(data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["providers"] });
        toast("El proveedor ha sido actualizado correctamente");
        onOpenChange(false);
      },
    }
  );

  const onSubmit = (data: ProviderFormValues) => {
    if (isEditing && provider) {
      updateProviderMutation({
        id: provider.id,
        celularContacto: data.contactPhone,
        direccion: data.address,
        nombre: data.name,
        nombreContacto: data.contactName,
        numeroIdentificacion: data.identificationNumber,
        tipoIdentificacion: data.identificationType,
        estado: "Activo",
      });
    } else {
      createProviderMutation({
        celularContacto: data.contactPhone,
        direccion: data.address,
        nombre: data.name,
        nombreContacto: data.contactName,
        numeroIdentificacion: data.identificationNumber,
        tipoIdentificacion: data.identificationType,
        estado: "Activo",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar proveedor" : "Nuevo proveedor"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Edita los detalles del proveedor existente."
              : "Completa los detalles para crear un nuevo proveedor."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="identificationType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de ID</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="CC">Cédula</SelectItem>
                        <SelectItem value="NIT">NIT</SelectItem>
                        <SelectItem value="CE">C. Extranjería</SelectItem>
                        <SelectItem value="NE">NIT Extranjería</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="identificationNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de ID</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Número de identificación"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre/Razón Social</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre o razón social" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input placeholder="Dirección" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de Contacto</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre de contacto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono de Contacto</FormLabel>
                  <FormControl>
                    <Input placeholder="Teléfono de contacto" {...field} />
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
