import { render, screen } from '@testing-library/react'
import Header from '@/components/Header'

describe('Header Component', () => {
  it('should render the logo', () => {
    render(<Header />)
    const logo = screen.getByTestId('logo')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveTextContent('E-Shop')
  })

  it('should render navigation links', () => {
    render(<Header />)
    const homeLink = screen.getByTestId('nav-home')
    const catalogLink = screen.getByTestId('nav-catalog')

    expect(homeLink).toBeInTheDocument()
    expect(homeLink).toHaveTextContent('Home')
    expect(catalogLink).toBeInTheDocument()
    expect(catalogLink).toHaveTextContent('Catalog')
  })

  it('should have correct href attributes on links', () => {
    render(<Header />)
    const homeLink = screen.getByTestId('nav-home')
    const catalogLink = screen.getByTestId('nav-catalog')

    expect(homeLink).toHaveAttribute('href', '/')
    expect(catalogLink).toHaveAttribute('href', '/catalog')
  })

  it('should apply correct CSS classes', () => {
    render(<Header />)
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('bg-gray-900', 'text-white')
  })
})
