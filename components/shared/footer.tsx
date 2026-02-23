export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800">
      <div className="container-global py-8 text-sm text-neutral-500">
        © {new Date().getFullYear()} Snikei. All rights reserved.
      </div>
    </footer>
  )
}