'use client'

import { FilterState } from '@/types/product'

interface FilterBarProps {
  filters: FilterState
  onFilterChange: (filters: FilterState) => void
  categories: string[]
}

export default function FilterBar({
  filters,
  onFilterChange,
  categories,
}: FilterBarProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: e.target.value })
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, category: e.target.value })
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-medium mb-2">
            Search
          </label>
          <input
            type="text"
            id="search"
            data-testid="search-input"
            value={filters.search}
            onChange={handleSearchChange}
            placeholder="Search products..."
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="w-full md:w-48">
          <label htmlFor="category" className="block text-sm font-medium mb-2">
            Category
          </label>
          <select
            id="category"
            data-testid="category-select"
            value={filters.category}
            onChange={handleCategoryChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
