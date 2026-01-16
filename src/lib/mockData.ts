import { Product } from '@/types/product'

export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Premium Headphones',
    price: 299.99,
    category: 'Electronics',
    image: '/placeholder.jpg',
    description: 'High-quality wireless headphones with noise cancellation',
  },
  {
    id: 2,
    name: 'Running Shoes',
    price: 129.99,
    category: 'Sports',
    image: '/placeholder.jpg',
    description: 'Comfortable running shoes for all terrains',
  },
  {
    id: 3,
    name: 'Coffee Maker',
    price: 89.99,
    category: 'Home',
    image: '/placeholder.jpg',
    description: 'Automatic coffee maker with timer',
  },
  {
    id: 4,
    name: 'Laptop Bag',
    price: 49.99,
    category: 'Accessories',
    image: '/placeholder.jpg',
    description: 'Durable laptop bag with multiple compartments',
  },
  {
    id: 5,
    name: 'Smartwatch',
    price: 399.99,
    category: 'Electronics',
    image: '/placeholder.jpg',
    description: 'Advanced smartwatch with health tracking',
  },
  {
    id: 6,
    name: 'Yoga Mat',
    price: 34.99,
    category: 'Sports',
    image: '/placeholder.jpg',
    description: 'Non-slip yoga mat for comfortable practice',
  },
]

export const categories = ['All', 'Electronics', 'Sports', 'Home', 'Accessories']
