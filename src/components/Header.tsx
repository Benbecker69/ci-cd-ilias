import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold" data-testid="logo">
          E-Shop
        </Link>
        <nav>
          <ul className="flex gap-6">
            <li>
              <Link
                href="/"
                className="hover:text-gray-300"
                data-testid="nav-home"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/catalog"
                className="hover:text-gray-300"
                data-testid="nav-catalog"
              >
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
