import { render, screen, fireEvent, within } from '@testing-library/react'
import CatalogPage from '@/app/catalog/page'

// Mock Next.js Link component
jest.mock('next/link', () => {
  const MockLink = ({ children, ...props }: React.PropsWithChildren<React.ComponentPropsWithoutRef<'a'>>) => {
    return <a {...props}>{children}</a>
  }
  MockLink.displayName = 'MockLink'
  return MockLink
})

describe('Catalog Page Integration', () => {
  it('should render the catalog page with all components', () => {
    render(<CatalogPage />)

    // Check header is present
    expect(screen.getByTestId('logo')).toBeInTheDocument()

    // Check page title
    expect(screen.getByTestId('catalog-title')).toHaveTextContent(
      'Product Catalog'
    )

    // Check filter components
    expect(screen.getByTestId('search-input')).toBeInTheDocument()
    expect(screen.getByTestId('category-select')).toBeInTheDocument()

    // Check products grid
    expect(screen.getByTestId('products-grid')).toBeInTheDocument()
  })

  it('should display all products initially', () => {
    render(<CatalogPage />)

    // Should render 6 products (based on mockData)
    const productCards = screen.getAllByTestId(/product-card-/)
    expect(productCards.length).toBe(6)
  })

  it('should filter products by search term', () => {
    render(<CatalogPage />)

    const searchInput = screen.getByTestId('search-input')
    fireEvent.change(searchInput, { target: { value: 'headphones' } })

    // Should only show products matching "headphones"
    const productCards = screen.getAllByTestId(/product-card-/)
    expect(productCards.length).toBe(1)

    // Verify it's the correct product
    expect(screen.getByText('Premium Headphones')).toBeInTheDocument()
  })

  it('should filter products by category', () => {
    render(<CatalogPage />)

    const categorySelect = screen.getByTestId('category-select')
    fireEvent.change(categorySelect, { target: { value: 'Electronics' } })

    // Should show only Electronics products (2 in mockData)
    const productCards = screen.getAllByTestId(/product-card-/)
    expect(productCards.length).toBe(2)
  })

  it('should combine search and category filters', () => {
    render(<CatalogPage />)

    const searchInput = screen.getByTestId('search-input')
    const categorySelect = screen.getByTestId('category-select')

    // Filter by category first
    fireEvent.change(categorySelect, { target: { value: 'Sports' } })
    let productCards = screen.getAllByTestId(/product-card-/)
    expect(productCards.length).toBe(2) // Running Shoes + Yoga Mat

    // Then add search filter
    fireEvent.change(searchInput, { target: { value: 'yoga' } })
    productCards = screen.getAllByTestId(/product-card-/)
    expect(productCards.length).toBe(1)
    expect(screen.getByText('Yoga Mat')).toBeInTheDocument()
  })

  it('should show "no products" message when no matches', () => {
    render(<CatalogPage />)

    const searchInput = screen.getByTestId('search-input')
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } })

    expect(screen.getByTestId('no-products')).toBeInTheDocument()
    expect(screen.getByText('No products found')).toBeInTheDocument()
  })

  it('should render product cards with correct information', () => {
    render(<CatalogPage />)

    // Find the first product card
    const productCard = screen.getByTestId('product-card-1')

    // Verify product information is displayed
    expect(within(productCard).getByTestId('product-name')).toHaveTextContent(
      'Premium Headphones'
    )
    expect(within(productCard).getByTestId('product-price')).toHaveTextContent(
      '$299.99'
    )
    expect(
      within(productCard).getByTestId('product-category')
    ).toHaveTextContent('Electronics')
  })

  it('should have working links to product details', () => {
    render(<CatalogPage />)

    const productCard = screen.getByTestId('product-card-1')
    const detailsLink = within(productCard).getByTestId('view-details-link')

    expect(detailsLink).toHaveAttribute('href', '/products/1')
  })

  it('should reset to all products when search is cleared', () => {
    render(<CatalogPage />)

    const searchInput = screen.getByTestId('search-input')

    // Filter first
    fireEvent.change(searchInput, { target: { value: 'headphones' } })
    let productCards = screen.getAllByTestId(/product-card-/)
    expect(productCards.length).toBe(1)

    // Clear search
    fireEvent.change(searchInput, { target: { value: '' } })
    productCards = screen.getAllByTestId(/product-card-/)
    expect(productCards.length).toBe(6)
  })
})
