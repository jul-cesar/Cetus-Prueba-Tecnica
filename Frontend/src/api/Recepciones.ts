import { API_URL } from "@/lib/utils";
import type { InsertRecepcion } from "@/Types";

export const getRecepciones = async () => {
  try {
    const response = await fetch(`${API_URL}/recepciones`);
    if (!response.ok) {
      throw new Error("Failed to fetch recepciones");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching recepciones:", error);
    throw error;
  }
};

export const createRecepcion = async (recepcionData: InsertRecepcion) => {
  try {
    const response = await fetch(`${API_URL}/recepciones`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recepcionData),
    });
    if (!response.ok) {
      throw new Error("Failed to create recepcion");
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating recepcion:", error);
    throw error;
  }
}   

export const updateRecepcion = async (recepcionData: InsertRecepcion & { id: string }) => {
  try {
    const response = await fetch(`${API_URL}/recepciones/${recepcionData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recepcionData),
    });
    if (!response.ok) {
      throw new Error(`Failed to update recepcion with id ${recepcionData.id}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating recepcion:", error);
    throw error;
  }
}

export const deleteRecepcion = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/recepciones/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete recepcion with id ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting recepcion:", error);
    throw error;
  }
}   

