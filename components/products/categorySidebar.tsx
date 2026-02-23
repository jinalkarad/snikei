"use client"

import { Product } from "@/lib/types"
import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { FiChevronDown } from "react-icons/fi"

interface Props {
  products: Product[]
  activeSlug: string | null
}

function createSlug(category: string) {
  return category
    .toLowerCase()
    .replace(/\s/g, "")
    .replace(/'/g, "")
}

export default function CategorySidebar({
  products,
  activeSlug,
}: Props) {
  const [open, setOpen] = useState(true)
  const router = useRouter()

const categories = useMemo(() => {
  if (!products) return []

  return Array.from(
    new Set(products.map((p) => p.category))
  )
}, [products])

  const handleClick = (category: string | null) => {
    if (!category) {
      router.push("/products")
      return
    }

    const slug = createSlug(category)
    router.push(`/category/${slug}`)
  }

  return (
    <div className="border rounded-lg p-6 h-fit">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between text-lg font-semibold mb-4"
      >
        Categories
        <FiChevronDown
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="space-y-3">
          {/* All Products */}
          <label
            onClick={() => handleClick(null)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <input
              type="radio"
              checked={activeSlug === null}
              readOnly
            />
            <span>All Products</span>
          </label>

          {categories.map((cat) => {
            const slug = createSlug(cat)
            const isActive = slug === activeSlug

            return (
              <label
                key={cat}
                onClick={() => handleClick(cat)}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="radio"
                  checked={isActive}
                  readOnly
                />
                <span>{cat}</span>
              </label>
            )
          })}
        </div>
      )}
    </div>
  )
}