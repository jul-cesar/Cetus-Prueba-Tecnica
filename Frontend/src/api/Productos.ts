import { API_URL } from "@/lib/utils";
import type { InsertProduct } from "@/Types";

export const getProducts = async () => {
  const response = await fetch(`${API_URL}/productos`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};

export const getProductById = async (id: string) => {
  const response = await fetch(`${API_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch product with id ${id}`);
  }
  return response.json();
};

export const createProduct = async (product: InsertProduct) => {
  const response = await fetch(`${API_URL}/productos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error("Failed to create product");
  }
  return response.json();
};

export const updateProduct = async (product:  InsertProduct & {id: string}) => {
  const response = await fetch(`${API_URL}/productos/${product.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error(`Failed to update product with id ${product.id}`);
  }
  return response.json();
}
export const toggleProductStatus = async (id: string) => {
  const response = await fetch(`${API_URL}/productos/${id}/toggle-status`, {
    method: "PATCH",
  });
  if (!response.ok) {
    throw new Error(`Failed to toggle status for product with id ${id}`);
  }
  return response.json();
}

export const deleteProduct = async (id: string) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Failed to delete product with id ${id}`);
  }
  return response.json();
}