import { createSlice } from '@reduxjs/toolkit'
import { notification } from 'antd'
import { ErrorType } from '../../../../shared'
import {
  setFormField,
  setLoadingCreateProduct,
  createProduct,
  setAdditionFormField,
  removeAddition,
  addAddition,
  getProduct,
  updateProduct,
  resetForm
} from './productActions'

export interface ProductFormState {
  name: string
  image: Array<any>
  details: string
  price: number
  quantity: string
  category: { label: string; value: string }
  additions: Array<{ name: string; price: number }>
}

export interface ProductState {
  formState: ProductFormState
  loadingCreateProduct: boolean
  loadingUpdateProduct: boolean
  loadingGetProduct: boolean
  getProductError: ErrorType
}

const initialState: ProductState = {
  formState: {
    name: null,
    image: [],
    details: null,
    price: null,
    quantity: null,
    category: null,
    additions: []
  },
  loadingCreateProduct: false,
  loadingGetProduct: true,
  loadingUpdateProduct: false,
  getProductError: null
}
export { initialState as initialStateProduct }

export const { reducer: productReducer, actions: productActions } = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setFormField,
    setLoadingCreateProduct,
    setAdditionFormField,
    removeAddition,
    addAddition,
    resetForm
  },
  extraReducers: (builder) => {
    // create product
    builder.addCase(createProduct.pending, (state) => {
      state.loadingCreateProduct = true
    })
    builder.addCase(createProduct.fulfilled, (state) => {
      state.loadingCreateProduct = false
      state.formState = initialState.formState
      notification.success({ message: 'Продуктът беше успешно създаден.' })
    })
    builder.addCase(createProduct.rejected, (state, { error }) => {
      state.loadingCreateProduct = false
      notification.error({
        message: `Възникна проблем: ${error.message}`,
        description:
          'Моля опитайте по-късно. Ако проблемът продължава да съществува, моля свържете се с нас.',
        duration: 15
      })
    })
    // get product
    builder.addCase(getProduct.pending, (state) => {
      state.loadingGetProduct = true
    })
    builder.addCase(getProduct.fulfilled, (state, { payload }) => {
      state.loadingGetProduct = false
      state.formState = payload
    })
    builder.addCase(getProduct.rejected, (state, { error }) => {
      state.loadingGetProduct = false
      state.getProductError = { message: error.message }
      notification.error({
        message: `Възникна проблем: ${error.message}`,
        description:
          'Моля опитайте по-късно. Ако проблемът продължава да съществува, моля свържете се с нас.',
        duration: 15
      })
    })
    // update product

    builder.addCase(updateProduct.pending, (state) => {
      state.loadingUpdateProduct = true
    })
    builder.addCase(updateProduct.fulfilled, (state, _) => {
      state.loadingUpdateProduct = false
      notification.success({ message: 'Продуктът беше обновен успешно!', duration: 5 })
    })
    builder.addCase(updateProduct.rejected, (state, { error }) => {
      state.loadingUpdateProduct = false
      notification.error({
        message: `Възникна проблем: ${error.message}`,
        description:
          'Моля опитайте по-късно. Ако проблемът продължава да съществува, моля свържете се с нас.',
        duration: 15
      })
    })
  }
})
