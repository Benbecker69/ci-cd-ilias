import Link from 'next/link'
import Header from '@/components/Header'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">Welcome to E-Shop</h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover amazing products at great prices. Browse our catalog to
            find what you need.
          </p>
          <Link
            href="/catalog"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            Browse Catalog
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-3">Quality Products</h2>
            <p className="text-gray-600">
              We offer a wide selection of high-quality products across various
              categories.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-3">Fast Delivery</h2>
            <p className="text-gray-600">
              Get your orders delivered quickly and safely to your doorstep.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-3">Great Prices</h2>
            <p className="text-gray-600">
              Competitive pricing on all our products with regular special
              offers.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
