import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const API_URL = "https://celtus-prueba-back.vercel.app/api/v1";
// export const API_URL =  "http://localhost:3000/api/v1";