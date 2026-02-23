"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react"
import { Product } from "@/lib/types"

export interface CartItem {
  product: Product
  quantity: number
  size: string
}

interface CartContextType {
  cart: CartItem[]
  count: number
  addToCart: (item: CartItem) => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  const count = cart.reduce((acc, item) => acc + item.quantity, 0)

  useEffect(() => {
    const stored = localStorage.getItem("cart-items")
    if (stored) setCart(JSON.parse(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem("cart-items", JSON.stringify(cart))
  }, [cart])

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.product.id === item.product.id && i.size === item.size
      )
      if (existingIndex > -1) {
        const newCart = [...prev]
        newCart[existingIndex].quantity += item.quantity
        return newCart
      }
      return [...prev, item]
    })
  }

  return (
    <CartContext.Provider value={{ cart, count, addToCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("Cart must be used inside CartProvider")
  return ctx
}