"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import AddToCartButton from "@/components/products/addToCartButton"
import api from "@/lib/axios"

interface Product {
  id: number
  title: string
  price: number
  description: string
  image: string
  category: string
}

const SIZES = ["S", "M", "L", "XL", "XXL"]

export default function ProductDetail() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const [selectedSize, setSelectedSize] = useState<string>(SIZES[0])
  const [quantity, setQuantity] = useState<number>(1)

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true)
        const res = await api.get(`/products/${params.id}`)
        setProduct(res.data)
      } catch (err) {
        console.error("Axios Error:", err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    if (params?.id) {
      fetchProduct()
    }
  }, [params?.id])

  if (loading) return <p className="text-center py-10">Loading...</p>
  if (error || !product) return <p className="text-center py-10">Product not found</p>

  return (
    <article className="grid md:grid-cols-2 gap-12 px-6 py-16 container-global">
      <Image
        src={product.image}
        alt={product.title}
        width={350}
        height={350}
        className="m-auto"
      />

      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">{product.title}</h1>
        <p className="mt-2 sm:mt-6 sm:text-xl text-sm font-bold">${product.price}</p>
        <p className="mt-4 text-sm">{product.description}</p>

        <div className="mt-6">
  <div className="flex flex-wrap gap-3">
    {SIZES.map((size) => (
      <button
        key={size}
        onClick={() => setSelectedSize(size)}
        className={`px-4 py-2 text-sm border rounded-md font-medium transition 
          ${selectedSize === size
            ? "bg-black text-white border-black"
            : "bg-white text-black border-gray-300 hover:border-black"
          }`}
      >
        {size}
      </button>
    ))}
  </div>
</div>

        <div className="mt-6 flex items-baseline gap-2">
          <div className="flex items-center border rounded-md w-fit">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 py-1 font-bold text-lg border-r hover:bg-gray-100"
            >
              -
            </button>
            <span className="px-4 py-1">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-3 py-1 font-bold text-lg border-l hover:bg-gray-100"
            >
              +
            </button>
          </div>
          <div className="w-1/2">
          <AddToCartButton product={product} quantity={quantity} size={selectedSize} />
        </div>
        </div>

        

        <div className="pt-4">
          <h2 className="text-[18px] font-semibold">More info</h2>
          <ul className="text-sm list-disc pl-[14px]">
            <li>Available in a comprehensive range of sizes</li>
            <li>Pre-softened for enhanced comfort and flexibility</li>
          </ul>
        </div>
      </div>
    </article>
  )
}