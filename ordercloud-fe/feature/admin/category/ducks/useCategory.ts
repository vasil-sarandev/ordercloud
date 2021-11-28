import { useAppDispatch } from '../../../state'
import {
  formFieldKeys,
  createCategory as createCategoryAction,
  getCategory as getCategoryAction,
  updateCategory as updateCategoryAction
} from './categoryActions'
import { categoryActions } from './categoryReducer'

interface UseCategory {
  setFormField: (which: formFieldKeys, value: any) => void
  setLoadingCreateCategory: (value: boolean) => void
  createCategory: () => void
  getCategory: (id: string) => void
  updateCategory: (id: string) => void
  resetForm: () => void
}

export const useCategory = (): UseCategory => {
  const dispatch = useAppDispatch()

  const setFormField = (which: formFieldKeys, value: any) => {
    dispatch(categoryActions.setFormField({ which, value }))
  }

  const setLoadingCreateCategory = (val: boolean) => {
    dispatch(categoryActions.setLoadingCreateCategory(val))
  }

  const createCategory = () => {
    dispatch(createCategoryAction())
  }

  const getCategory = (id: string) => {
    dispatch(getCategoryAction(id))
  }

  const updateCategory = (id: string) => {
    dispatch(updateCategoryAction(id))
  }

  const resetForm = () => {
    dispatch(categoryActions.resetForm())
  }

  return {
    setFormField,
    setLoadingCreateCategory,
    getCategory,
    updateCategory,
    createCategory,
    resetForm
  }
}
