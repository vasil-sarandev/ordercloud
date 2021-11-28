import { RootState } from '../../../state'
import { CartProduct } from '../../model'
import { CartFormState } from './cartReducer'

export const getCart = (state: RootState): Array<CartProduct> => state.cart.cart
export const getCartVisible = (state: RootState): boolean => state.cart.visible
export const getCartFormState = (state: RootState): CartFormState => state.cart.formState
export const getCreateOrderLoading = (state: RootState): boolean => state.cart.createOrderLoading
