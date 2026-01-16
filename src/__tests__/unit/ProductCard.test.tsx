import { render, screen } from '@testing-library/react'
import ProductCard from '@/components/ProductCard'
import { Product } from '@/types/product'

const mockProduct: Product = {
  id: 1,
  name: 'Test Product',
  price: 99.99,
  category: 'Electronics',
  image: '/test.jpg',
  description: 'A test product description',
}

describe('ProductCard Component', () => {
  it('should render product information correctly', () => {
    render(<ProductCard product={mockProduct} />)

    expect(screen.getByTestId('product-name')).toHaveTextContent('Test Product')
    expect(screen.getByTestId('product-category')).toHaveTextContent(
      'Electronics'
    )
    expect(screen.getByTestId('product-price')).toHaveTextContent('$99.99')
  })

  it('should render product image with correct attributes', () => {
    render(<ProductCard product={mockProduct} />)
    const image = screen.getByAltText('Test Product')

    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/test.jpg')
  })

  it('should render view details link with correct href', () => {
    render(<ProductCard product={mockProduct} />)
    const link = screen.getByTestId('view-details-link')

    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/products/1')
    expect(link).toHaveTextContent('View Details')
  })

  it('should format price to 2 decimal places', () => {
    const productWithPrice = { ...mockProduct, price: 100 }
    render(<ProductCard product={productWithPrice} />)

    expect(screen.getByTestId('product-price')).toHaveTextContent('$100.00')
  })

  it('should render with correct data-testid', () => {
    render(<ProductCard product={mockProduct} />)
    const card = screen.getByTestId('product-card-1')

    expect(card).toBeInTheDocument()
  })
})
