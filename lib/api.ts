import api from "./axios"
import { Product } from "./types"

export async function getProducts(): Promise<Product[]> {
  try {
    const res = await api.get("/products")
    return res.data
  } catch (error) {
    throw new Error("Failed to fetch products")
  }
}