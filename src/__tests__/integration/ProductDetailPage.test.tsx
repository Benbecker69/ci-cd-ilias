import { render, screen } from '@testing-library/react'
import ProductDetailPage from '@/app/products/[id]/page'
import * as navigation from 'next/navigation'

// Mock Next.js modules
jest.mock('next/link', () => {
  const MockLink = ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => {
    return <a {...props}>{children}</a>
  }
  MockLink.displayName = 'MockLink'
  return MockLink
})

jest.mock('next/navigation', () => ({
  notFound: jest.fn(() => {
    throw new Error('NEXT_NOT_FOUND')
  }),
}))

describe('Product Detail Page Integration', () => {
  it('should render product details correctly', async () => {
    const params = Promise.resolve({ id: '1' })
    render(await ProductDetailPage({ params }))

    // Check header is present
    expect(screen.getByTestId('logo')).toBeInTheDocument()

    // Check back link
    expect(screen.getByTestId('back-to-catalog')).toBeInTheDocument()
    expect(screen.getByTestId('back-to-catalog')).toHaveAttribute(
      'href',
      '/catalog'
    )

    // Check product details
    expect(screen.getByTestId('product-detail-name')).toHaveTextContent(
      'Premium Headphones'
    )
    expect(screen.getByTestId('product-detail-category')).toHaveTextContent(
      'Category: Electronics'
    )
    expect(screen.getByTestId('product-detail-price')).toHaveTextContent(
      '$299.99'
    )
    expect(screen.getByTestId('product-detail-description')).toHaveTextContent(
      'High-quality wireless headphones with noise cancellation'
    )

    // Check add to cart button
    expect(screen.getByTestId('add-to-cart-button')).toBeInTheDocument()
  })

  it('should render different products based on id', async () => {
    const params = Promise.resolve({ id: '2' })
    render(await ProductDetailPage({ params }))

    expect(screen.getByTestId('product-detail-name')).toHaveTextContent(
      'Running Shoes'
    )
    expect(screen.getByTestId('product-detail-category')).toHaveTextContent(
      'Category: Sports'
    )
    expect(screen.getByTestId('product-detail-price')).toHaveTextContent(
      '$129.99'
    )
  })

  it('should display product image with correct alt text', async () => {
    const params = Promise.resolve({ id: '1' })
    render(await ProductDetailPage({ params }))

    const image = screen.getByAltText('Premium Headphones')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/placeholder.jpg')
  })

  it('should have functional back to catalog link', async () => {
    const params = Promise.resolve({ id: '1' })
    render(await ProductDetailPage({ params }))

    const backLink = screen.getByTestId('back-to-catalog')
    expect(backLink).toHaveTextContent('← Back to Catalog')
    expect(backLink).toHaveAttribute('href', '/catalog')
  })

  it('should render add to cart button', async () => {
    const params = Promise.resolve({ id: '3' })
    render(await ProductDetailPage({ params }))

    const addToCartButton = screen.getByTestId('add-to-cart-button')
    expect(addToCartButton).toHaveTextContent('Add to Cart')
    expect(addToCartButton).toHaveClass('bg-blue-600')
  })

  it('should call notFound for non-existent product', async () => {
    const params = Promise.resolve({ id: '999' })

    await expect(ProductDetailPage({ params })).rejects.toThrow('NEXT_NOT_FOUND')
    expect(navigation.notFound).toHaveBeenCalled()
  })

  it('should format prices with two decimal places', async () => {
    const params = Promise.resolve({ id: '3' })
    render(await ProductDetailPage({ params }))

    // Coffee Maker price is 89.99
    const price = screen.getByTestId('product-detail-price')
    expect(price).toHaveTextContent('$89.99')
  })
})
