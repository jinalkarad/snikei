"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function HeaderSearch({
  onClose,
}: {
  onClose: () => void
}) {
  const router = useRouter()
  const params = useSearchParams()
  const [value, setValue] = useState(params.get("q") || "")

  const submitSearch = () => {
    if (!value.trim()) return
    router.push(`/products?q=${encodeURIComponent(value.trim())}`)
    onClose()
  }

  return (
    <div className="border-t bg-white dark:bg-black">
      <div className="container-global px-4 py-2">
        <input
          autoFocus
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submitSearch()}
          placeholder="Search products..."
          className="w-full text-sm sm:text-lg px-4 py-3 border rounded-md
                     focus:outline-none focus:ring-2 focus:ring-black dark:bg-black"
        />
      </div>
    </div>
  )
}