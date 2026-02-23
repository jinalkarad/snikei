"use client"

import Link from "next/link"
import Image from "next/image"
import { Product } from "@/lib/types"

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group">
      <Link href={`/products/${product.id}`}>
        <div className="overflow-hidden rounded-[12px] bg-gray-100">
          <Image
            src={product.image}
            alt={product.title}
            width={300}
            height={300}
            className="object-contain mx-auto h-48 
                       transition-transform duration-500 
                       group-hover:scale-110"
          />
        </div>

        <div className="flex items-baseline justify-between gap-1 mt-2 text-sm sm:text-base pr-[10px]">
          <h4 className="font-semibold text-base sm:text-lg line-clamp-2">
            {product.title}
          </h4>

          <span className="text-xs flex items-center">
            <Image
              src="/svg/star.svg"
              alt="rate"
              width={15}
              height={15}
              className="pr-[5px]"
            />
            (4.8)
          </span>
        </div>

        <span className="text-sm sm:text-[16px]">$ {product.price} USD</span>
      </Link>
    </article>
  )
}