import { Addition } from './Addition'

export type Product = {
  id: string
  _id: string
  name: string
  image: string
  details?: string
  price: number
  quantity: string
  additions?: Array<Addition>
}
