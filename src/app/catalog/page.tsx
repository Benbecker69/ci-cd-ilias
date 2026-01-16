'use client'

import { useState, useMemo } from 'react'
import Header from '@/components/Header'
import ProductCard from '@/components/ProductCard'
import FilterBar from '@/components/FilterBar'
import { mockProducts, categories } from '@/lib/mockData'
import { FilterState } from '@/types/product'

export default function CatalogPage() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'All',
  })

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(filters.search.toLowerCase())
      const matchesCategory =
        filters.category === 'All' || product.category === filters.category

      return matchesSearch && matchesCategory
    })
  }, [filters])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6" data-testid="catalog-title">
          Product Catalog
        </h1>
        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          categories={categories}
        />
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          data-testid="products-grid"
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500" data-testid="no-products">
              No products found
            </p>
          )}
        </div>
      </main>
    </div>
  )
}
