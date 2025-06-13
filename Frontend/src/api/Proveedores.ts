import { API_URL } from "@/lib/utils";
import type { InsertProveedor } from "@/Types";

export const getProveedores = async () => {
  const response = await fetch(`${API_URL}/proveedores`);
  if (!response.ok) {
    throw new Error("Error fetching proveedores");
  }
  return response.json();
}

export const createProveedor = async (proveedor: InsertProveedor) => {
  const response = await fetch(`${API_URL}/proveedores`, {    
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(proveedor),
  });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Error creating proveedor");
    }
    return response.json();
}

export const updateProveedor = async (proveedor: InsertProveedor & { id: string }) => {
  const response = await fetch(`${API_URL}/proveedores/${proveedor.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(proveedor),
  });
  if (!response.ok) {
    throw new Error(`Error updating proveedor with id ${proveedor.id}`);
  }
  return response.json();
}

export const toggleProveedorStatus = async (id: string) => {
  const response = await fetch(`${API_URL}/proveedores/${id}/toggle-status`, {
    method: "PATCH",
  });
  if (!response.ok) {
    throw new Error(`Error toggling status for proveedor with id ${id}`);
  }
  return response.json();
}