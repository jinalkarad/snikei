"use client"

import { useMemo } from "react"
import { Product } from "@/lib/types"
import ProductCard from "./productCard"
import CategorySidebar from "./categorySidebar"
export default function ProductsClient({
  products,
  allProducts,
  initialCategory,
}: {
  products: Product[]
  allProducts: Product[]
  initialCategory: string | null
}){

  const title = useMemo(() => {
    if (!initialCategory) return "All Products"

    const matched = products.find((p) =>
      p.category
        .toLowerCase()
        .replace(/\s/g, "")
        .replace(/'/g, "") === initialCategory
    )

    return matched ? matched.category : initialCategory
  }, [products, initialCategory])

  return (
    <section className="container-global px-6 py-16">
      <h1 className="text-5xl font-bold pb-16 text-center capitalize">
        {title}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">
        <CategorySidebar
  products={allProducts}
  activeSlug={initialCategory}

        />

        <div className="grid gap-8 grid-cols-2 sm:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}