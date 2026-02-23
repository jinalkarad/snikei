import { getProducts } from "@/lib/api"
import ProductsClient from "@/components/products/productClient"

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <ProductsClient
  products={products}
  allProducts={products}
  initialCategory={null}
/>
  )
}