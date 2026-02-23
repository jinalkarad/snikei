"use client"

import Link from "next/link"
import { useState } from "react"
import { useCart } from "../cartProvider"
import DarkModeToggle from "./darkModeToggle"
import Image from "next/image"
import { FiMenu, FiX, FiSearch } from "react-icons/fi"
import HeaderSearch from "./searchBar"

export default function Header() {
  const { count } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-black shadow">
      <div className="flex items-center justify-between py-4 px-6 container-global m-auto">
        <Link href="/" className="flex items-center">
          <Image src="/svg/logo.svg" alt="logo" width={80} height={80} />
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link href="/category">Categories</Link>
          <Link href="/products">Shop</Link>
          <Link href="#">About</Link>
          <Link href="#">Blog</Link>
          <Link href="#">Contact</Link>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setSearchOpen((p) => !p)}
            aria-label="Open search"
          >
            <FiSearch size={18} />
          </button>

          <div className="relative">
            <Image src="/svg/cart.svg" alt="cart" width={18} height={18} />
            <span className="absolute -top-2 -right-2 text-[9px] bg-black text-white rounded-full px-1">
              {count}
            </span>
          </div>

          <DarkModeToggle />

          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {searchOpen && <HeaderSearch onClose={() => setSearchOpen(false)} />}

      {/* Mobile */}
      {menuOpen && (
        <nav className="md:hidden border-t">
          <ul className="flex flex-col gap-4 p-4 text-sm">
            <li><Link href="/products">Shop</Link></li>
            <li><Link href="#">About</Link></li>
            <li><Link href="#">Blog</Link></li>
            <li><Link href="#">Contact</Link></li>
          </ul>
        </nav>
      )}
    </header>
  )
}