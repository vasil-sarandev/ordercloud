import { Addition, Product } from '../../../../shared'
import { useAppDispatch } from '../../../state'
import { formFieldKeys, createOrder as createOrderAction } from './cartActions'
import { cartActions } from './cartReducer'

interface UseCart {
  addProduct: (product: Product, selectedAdditions: Array<Addition>) => void
  removeProduct: (product: Product, additions: Array<Addition>) => void
  setCartVisible: (val: boolean) => void
  setFormField: (which: formFieldKeys, value: string) => void
  createOrder: () => void
}

export const useCart = (): UseCart => {
  const dispatch = useAppDispatch()

  const addProduct = (product: Product, selectedAdditions: Array<Addition>): void => {
    dispatch(cartActions.addProduct({ product, selectedAdditions }))
  }

  const removeProduct = (product: Product, additions: Array<Addition>): void => {
    dispatch(cartActions.removeProduct({ product, additions }))
  }

  const setCartVisible = (val: boolean): void => {
    dispatch(cartActions.setCartVisible(val))
  }

  const setFormField = (which: formFieldKeys, value: string) => {
    dispatch(cartActions.setFormField({ which, value }))
  }

  const createOrder = () => {
    dispatch(createOrderAction())
  }

  return {
    addProduct,
    removeProduct,
    setCartVisible,
    setFormField,
    createOrder
  }
}
