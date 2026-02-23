import { getProducts } from "@/lib/api"
import ProductsClient from "@/components/products/productClient"
export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const products = await getProducts()

  const normalizedSlug = slug.toLowerCase()

  const filteredProducts = products.filter((product) =>
    product.category
      .toLowerCase()
      .replace(/\s/g, "")
      .replace(/'/g, "") === normalizedSlug
  )

  return (
    <ProductsClient
  products={filteredProducts}
  allProducts={products}
  initialCategory={normalizedSlug}
/>
  )
}