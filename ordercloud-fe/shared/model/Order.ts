import { CartProduct } from '../../feature/venue'
import { OrderingType } from './OrderingType'

export type Order = {
  _id: string
  createdAt: string
  slug: string
  totalPrice: number
  complete: boolean
  products: Array<CartProduct>
  details: {
    orderType: OrderingType
    siteLocation?: string
    comment?: string
    name?: string
    phoneNumber?: string
    address?: string
  }
}
