"use client";

import { getProducts } from "@/api/Productos";
import { columns } from "@/components/products/columns";
import { DataTable } from "@/components/products/data-table";

import { ProductDialog } from "@/components/products/product-dialog";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function ProductsPage() {
  const [open, setOpen] = useState(false);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Productos</h1>
          <p className="text-muted-foreground">
            Gestiona los productos de tu inventario
          </p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Producto
        </Button>
      </div>

      <DataTable columns={columns} data={products} isLoading={isLoading} />

      <ProductDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
