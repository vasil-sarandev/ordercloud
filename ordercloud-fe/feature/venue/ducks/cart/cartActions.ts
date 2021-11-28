import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Addition, Order, Product } from '../../../../shared'
import { RootState } from '../../../state'
import { VenueService } from '../../service'
import { addProductToCart, decreaseProductQuantity } from '../../util'
import { createOrderInfo } from '../../util/createOrderInfo'
import { CartState } from './cartReducer'

export type formFieldKeys = 'comment' | 'name' | 'address' | 'phoneNumber'

interface AddProductAction {
  product: Product
  selectedAdditions?: Array<Addition>
}
interface RemoveProductAction {
  product: Product
  additions: Array<Addition>
}
interface SetFormFieldAction {
  which: formFieldKeys
  value: string
}

export const addProduct = (state: CartState, { payload }: PayloadAction<AddProductAction>) => {
  const { product, selectedAdditions = [] } = payload
  const newCart = addProductToCart(product, selectedAdditions, state.cart)
  state.cart = newCart
}

export const removeProduct = (
  state: CartState,
  { payload }: PayloadAction<RemoveProductAction>
) => {
  const { product, additions } = payload
  const newCart = decreaseProductQuantity(product, additions, state.cart)
  state.cart = newCart
}

export const setCartVisible = (state: CartState, { payload }: PayloadAction<boolean>) => {
  state.visible = payload
}

export const setFormField = (state: CartState, { payload }: PayloadAction<SetFormFieldAction>) => {
  const { which, value } = payload
  const newFormState = { ...state.formState, [which]: value }
  state.formState = newFormState
}

export const createOrder = createAsyncThunk('cart/createOrder', async (_, { getState }) => {
  const state: RootState = getState() as RootState
  const order = createOrderInfo(state)
  const resp: string = (await VenueService.createOrder(order)).data
  return resp
})
