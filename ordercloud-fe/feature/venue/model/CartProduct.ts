import { Product, Addition } from '../../../shared'

export type CartProduct = {
  product: Product
  quantity: number
  additions: Array<Addition>
  price: number
}
