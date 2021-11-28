import { OrderingType } from '../../../shared'
import { RootState } from '../../state'
import { CartProduct } from '../model'
import { calculateTotalPrice } from './cartActions'

export interface CreateOrderObject {
  slug: string
  totalPrice: number
  products: CartProduct[]
  details: {
    orderType: OrderingType
    siteLocation: string
    comment?: string
    name?: string
    phoneNumber?: string
    address?: string
  }
}

export const createOrderInfo = (state: RootState): CreateOrderObject => {
  const { cart, venue } = state
  const { slug } = venue.venue
  const totalPrice = calculateTotalPrice(cart.cart)
  const order = {
    slug,
    totalPrice,
    products: cart.cart,
    details: {
      ...cart.formState,
      orderType: venue.orderingType,
      siteLocation: venue.siteLocation
    }
  }
  return order
}
