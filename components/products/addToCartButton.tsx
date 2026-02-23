"use client"

import { motion } from "framer-motion"
import { useCart } from "@/components/cartProvider"
import { Product } from "@/lib/types"

interface AddToCartButtonProps {
  product: Product
  quantity?: number
  size?: string
}

export default function AddToCartButton({
  product,
  quantity = 1,
  size = "S",
}: AddToCartButtonProps) {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart({ product, quantity, size })
  }

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={handleAddToCart}
      className="mt-4 px-8 text-[14px] sm:text-[16px] bg-black text-white py-2 rounded-md hover:bg-gray-900 transition"
    >
      Add to Cart
    </motion.button>
  )
}