import { ErrorType } from '../../../../shared'
import { RootState } from '../../../state'
import { ProductFormState } from './productReducer'

export const getProductFormState = (state: RootState): ProductFormState => state.product.formState

export const getLoadingCreateProduct = (state: RootState): boolean =>
  state.product.loadingCreateProduct

export const getLoadingUpdateProduct = (state: RootState): boolean =>
  state.product.loadingUpdateProduct

export const getLoadingGetProduct = (state: RootState): boolean => state.product.loadingGetProduct
export const getGetProductError = (state: RootState): ErrorType => state.product.getProductError
