import { ErrorType } from '../../../../shared'
import { RootState } from '../../../state'
import { CategoryFormState } from './categoryReducer'

export const getCategoryFormState = (state: RootState): CategoryFormState =>
  state.category.formState

export const getCategoryCreateLoading = (state: RootState): boolean =>
  state.category.loadingCreateCategory
export const getLoadingUpdateCategory = (state: RootState): boolean =>
  state.category.loadingUpdateCategory
export const getLoadingGetCategory = (state: RootState): boolean =>
  state.category.loadingGetCategory

export const getGetCategoryError = (state: RootState): ErrorType => state.category.getCategoryError
