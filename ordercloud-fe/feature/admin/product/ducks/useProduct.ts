import { useAppDispatch } from '../../../state'
import {
  formFieldKeys,
  createProduct as createProductAction,
  getProduct as getProductAction,
  updateProduct as updateProductAction
} from './productActions'
import { productActions } from './productReducer'

interface UseProduct {
  setFormField: (which: formFieldKeys, value: any) => void
  setAdditionFormField: (which: formFieldKeys, value: any, index: number) => void
  removeAddition: (index: number) => void
  addAddition: () => void
  setLoadingCreateProduct: (value: boolean) => void
  createProduct: () => void
  updateProduct: (id: string) => void
  getProduct: (id: string) => void
  resetForm: () => void
}

export const useProduct = (): UseProduct => {
  const dispatch = useAppDispatch()

  const setFormField = (which: formFieldKeys, value: any) => {
    dispatch(productActions.setFormField({ which, value }))
  }

  const setAdditionFormField = (which: formFieldKeys, value: any, index: number) => {
    dispatch(productActions.setAdditionFormField({ which, value, index }))
  }

  const removeAddition = (index: number) => {
    dispatch(productActions.removeAddition({ index }))
  }

  const addAddition = () => {
    dispatch(productActions.addAddition())
  }

  const setLoadingCreateProduct = (val: boolean) => {
    dispatch(productActions.setLoadingCreateProduct(val))
  }

  const createProduct = () => {
    dispatch(createProductAction())
  }

  const updateProduct = (id: string) => {
    dispatch(updateProductAction(id))
  }

  const getProduct = (id) => {
    dispatch(getProductAction(id))
  }

  const resetForm = () => {
    dispatch(productActions.resetForm())
  }

  return {
    setFormField,
    setAdditionFormField,
    removeAddition,
    addAddition,
    setLoadingCreateProduct,
    createProduct,
    updateProduct,
    getProduct,
    resetForm
  }
}
