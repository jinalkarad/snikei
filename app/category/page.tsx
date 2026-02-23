

import { getProducts } from "@/lib/api"
import HomeCategories from "@/components/categories"

export default async function CategoryPage() {
  const products = await getProducts()

  return (
    <HomeCategories products={products} />
  )
}