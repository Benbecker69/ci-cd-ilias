export interface Product {
  id: number
  name: string
  price: number
  category: string
  image: string
  description: string
}

export interface FilterState {
  search: string
  category: string
}
