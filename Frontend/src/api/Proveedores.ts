export const getProveedores = async () => {
  const response = await fetch("/api/proveedores");
  if (!response.ok) {
    throw new Error("Error fetching proveedores");
  }
  return response.json();
}