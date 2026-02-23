import Link from "next/link"
import Image from "next/image"
import { getProducts } from "@/lib/api"
import { ArrowRight } from "lucide-react"

export default async function HomePage() {
  const products = await getProducts()
  const bestSellers = products.slice(0, 8)

  return (
    <>
      <section className="min-h-[92vh] bg-[url('/img/hero-img.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="container-global px-6 flex flex-col h-full min-h-[92vh] justify-center  pb-[130px]">
          <h1 className="text-5xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-8xl text-white font-bold tracking-tight leading-tight md:leading-[1.1] mb-6">
            Explore <br className="hidden md:block" />
            Premium <br className="hidden md:block" />
            Shoes
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link
              href="/products"
              className="group flex items-center justify-center sm:justify-start bg-white text-black px-4 py-3 rounded-lg text-sm font-semibold hover:bg-gray-100 transition"
            >
              Shop Now <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 ml-2" />
            </Link>

            <Link
              href="/products"
              className="group flex items-center justify-center sm:justify-start bg-[#b29e8e] text-white px-4 py-3 rounded-lg text-sm font-semibold hover:bg-[#a18c7a] transition"
            >
              Categories <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 container-global">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <Feature
            icon="/svg/feature-1.svg"
            title="Sustainable Materials"
            desc="We use eco-conscious materials for long lasting quality."
          />
          <Feature
            icon="/svg/feature-2.svg"
            title="Warranty Included"
            desc="Every pair comes with a 6-month replacement warranty."
          />
          <Feature
            icon="/svg/feature-3.svg"
            title="Delivery & Shipping"
            desc="Fast delivery within 2–4 business days."
          />
          <Feature
            icon="/svg/feature-4.svg"
            title="Eco-Friendly Fabrics"
            desc="Crafted responsibly with planet-friendly fabrics."
          />
        </div>
      </section>

      <section className="py-16 px-6 container-global">
        <div className="">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8">
            Best Sellers
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-items-center">
            {bestSellers.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="pt-4 w-full max-w-[250px] sm:max-w-[280px]"
              >
                <div className="rounded-[12px] overflow-hidden bg-gray-100 w-full h-[160px] sm:h-[200px] lg:h-[240px] flex items-center justify-center">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={200}
                    height={200}
                    className="object-contain h-full w-auto p-8"
                  />
                </div>



                <div className="flex items-baseline justify-between gap-1 mt-1 text-sm sm:text-base pr-[10px]">
                  <h4 className="mt-2 font-semibold text-base sm:text-lg line-clamp-2">
                    {product.title}
                  </h4>
                  <span className="text-xs flex items-center"><Image src="/svg/star.svg" alt="rate" width={15} height={15} className="pr-[5px]" /> (4.8)</span>
                </div>

                <span className="">$ {product.price} USD</span>

              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function Feature({
  title,
  desc,
  icon,
}: {
  title: string
  desc: string
  icon: string
}) {
  return (
    <div className="flex flex-col items-center sm:items-start gap-2 text-center sm:text-left">
      <Image
        src={icon}
        alt={title}
        width={48}
        height={48}
        className="object-contain"
      />
      <h3 className="font-semibold text-lg sm:text-xl">{title}</h3>
      <p className="text-sm max-w-xs">{desc}</p>
    </div>
  )
}