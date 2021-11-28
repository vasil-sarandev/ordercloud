import { Product } from './Product'

export type Category = {
  id: string
  _id: string
  title: string
  image?: string
  products?: Array<Product>
}
