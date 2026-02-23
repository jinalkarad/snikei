import type { Metadata } from "next"
import "./globals.css"

import Header from "@/components/shared/header"
import Footer from "@/components/shared/footer"
import PageTransition from "@/components/pageTransition"
import { CartProvider } from "@/components/cartProvider"
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    default: "Snikei Store",
    template: "%s | Snikei",
  },
  description:
    "Premium footwear and lifestyle products. Clean design, modern experience.",
  keywords: [
    "Snikei",
    "Shoes",
    "Footwear",
    "Ecommerce",
    "Next.js Store",
  ],
  openGraph: {
    title: "Snikei Store",
    description:
      "Premium footwear and lifestyle products.",
    type: "website",
    siteName: "Snikei",
  },
  metadataBase: new URL("https://snikei.com"),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <CartProvider>
          <Header />
          <main
            id="main-content"
            className=""
          >
            {/* <PageTransition> */}
              {children}
            {/* </PageTransition> */}
          </main>

          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}