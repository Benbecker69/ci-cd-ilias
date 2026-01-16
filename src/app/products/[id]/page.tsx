import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import { mockProducts } from '@/lib/mockData'

interface ProductDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params
  const product = mockProducts.find((p) => p.id === parseInt(id))

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Link
          href="/catalog"
          className="text-blue-600 hover:underline mb-4 inline-block"
          data-testid="back-to-catalog"
        >
          ← Back to Catalog
        </Link>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-square bg-gray-200 rounded">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded"
              />
            </div>
            <div>
              <h1
                className="text-3xl font-bold mb-4"
                data-testid="product-detail-name"
              >
                {product.name}
              </h1>
              <p
                className="text-gray-600 mb-4"
                data-testid="product-detail-category"
              >
                Category: {product.category}
              </p>
              <p
                className="text-4xl font-bold text-blue-600 mb-6"
                data-testid="product-detail-price"
              >
                ${product.price.toFixed(2)}
              </p>
              <p
                className="text-gray-700 mb-6"
                data-testid="product-detail-description"
              >
                {product.description}
              </p>
              <button
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                data-testid="add-to-cart-button"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
