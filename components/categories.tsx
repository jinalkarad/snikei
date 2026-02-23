"use client"

import Image from "next/image"
import { useRef, useMemo } from "react"
import { useRouter } from "next/navigation"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import { Product } from "@/lib/types"

interface Props {
  products: Product[]
}

export default function HomeCategories({ products }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(products.map((p) => p.category))
    )
    return unique
  }, [products])

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return

    scrollRef.current.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    })
  }

  const handleClick = (category: string) => {
    const slug = category.toLowerCase().replace(/\s+/g, "-")
    router.push(`/category/${slug}`)
  }

  return (
    <>
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth container-global px-6 py-16 "
      >
        {categories.map((category) => (
          <div
            key={category}
            onClick={() => handleClick(category)}
            className="min-w-[220px] bg-gray-100 rounded-xl p-6 text-center cursor-pointer  transition"
          >
            <div className="relative h-40">
              <Image
                src="/img/cat-3.png"
                alt={category}
                fill
                className="object-contain"
              />
            </div>

            <h4 className="mt-4 font-medium">
              {category}
            </h4>
          </div>
        ))}
      </div>
    </>
  )
}


