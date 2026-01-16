import Link from 'next/link'
import { Product } from '@/types/product'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div
      className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
      data-testid={`product-card-${product.id}`}
    >
      <div className="aspect-square bg-gray-200 mb-4 rounded">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded"
        />
      </div>
      <h3 className="text-lg font-semibold mb-2" data-testid="product-name">
        {product.name}
      </h3>
      <p className="text-gray-600 mb-2" data-testid="product-category">
        {product.category}
      </p>
      <p className="text-xl font-bold mb-4" data-testid="product-price">
        ${product.price.toFixed(2)}
      </p>
      <Link
        href={`/products/${product.id}`}
        className="block text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        data-testid="view-details-link"
      >
        View Details
      </Link>
    </div>
  )
}
