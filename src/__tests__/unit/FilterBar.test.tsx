import { render, screen, fireEvent } from '@testing-library/react'
import FilterBar from '@/components/FilterBar'
import { FilterState } from '@/types/product'

const mockCategories = ['All', 'Electronics', 'Sports', 'Home']

describe('FilterBar Component', () => {
  const mockOnFilterChange = jest.fn()
  const defaultFilters: FilterState = {
    search: '',
    category: 'All',
  }

  beforeEach(() => {
    mockOnFilterChange.mockClear()
  })

  it('should render search input and category select', () => {
    render(
      <FilterBar
        filters={defaultFilters}
        onFilterChange={mockOnFilterChange}
        categories={mockCategories}
      />
    )

    expect(screen.getByTestId('search-input')).toBeInTheDocument()
    expect(screen.getByTestId('category-select')).toBeInTheDocument()
  })

  it('should display current filter values', () => {
    const filters: FilterState = {
      search: 'headphones',
      category: 'Electronics',
    }

    render(
      <FilterBar
        filters={filters}
        onFilterChange={mockOnFilterChange}
        categories={mockCategories}
      />
    )

    const searchInput = screen.getByTestId('search-input') as HTMLInputElement
    const categorySelect = screen.getByTestId(
      'category-select'
    ) as HTMLSelectElement

    expect(searchInput.value).toBe('headphones')
    expect(categorySelect.value).toBe('Electronics')
  })

  it('should call onFilterChange when search input changes', () => {
    render(
      <FilterBar
        filters={defaultFilters}
        onFilterChange={mockOnFilterChange}
        categories={mockCategories}
      />
    )

    const searchInput = screen.getByTestId('search-input')
    fireEvent.change(searchInput, { target: { value: 'laptop' } })

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      search: 'laptop',
      category: 'All',
    })
  })

  it('should call onFilterChange when category select changes', () => {
    render(
      <FilterBar
        filters={defaultFilters}
        onFilterChange={mockOnFilterChange}
        categories={mockCategories}
      />
    )

    const categorySelect = screen.getByTestId('category-select')
    fireEvent.change(categorySelect, { target: { value: 'Sports' } })

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      search: '',
      category: 'Sports',
    })
  })

  it('should render all category options', () => {
    render(
      <FilterBar
        filters={defaultFilters}
        onFilterChange={mockOnFilterChange}
        categories={mockCategories}
      />
    )

    mockCategories.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument()
    })
  })

  it('should have proper accessibility labels', () => {
    render(
      <FilterBar
        filters={defaultFilters}
        onFilterChange={mockOnFilterChange}
        categories={mockCategories}
      />
    )

    expect(screen.getByLabelText('Search')).toBeInTheDocument()
    expect(screen.getByLabelText('Category')).toBeInTheDocument()
  })
})
