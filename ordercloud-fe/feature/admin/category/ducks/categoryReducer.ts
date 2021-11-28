import { createSlice } from '@reduxjs/toolkit'
import { notification } from 'antd'
import { ErrorType } from '../../../../shared'
import {
  setFormField,
  setLoadingCreateCategory,
  createCategory,
  getCategory,
  updateCategory,
  resetForm
} from './categoryActions'

export interface CategoryFormState {
  title: string
  image: any
}

export interface CategoryState {
  formState: CategoryFormState
  loadingCreateCategory: boolean
  loadingGetCategory: boolean
  getCategoryError: ErrorType
  loadingUpdateCategory: boolean
}

const initialState: CategoryState = {
  formState: {
    title: null,
    image: []
  },
  loadingCreateCategory: false,
  loadingGetCategory: true,
  getCategoryError: null,
  loadingUpdateCategory: false
}
export { initialState as initialStateCategory }

export const { reducer: categoryReducer, actions: categoryActions } = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setFormField,
    setLoadingCreateCategory,
    resetForm
  },
  extraReducers: (builder) => {
    // create category
    builder.addCase(createCategory.pending, (state) => {
      state.loadingCreateCategory = true
    })
    builder.addCase(createCategory.fulfilled, (state) => {
      state.loadingCreateCategory = false
      state.formState = initialState.formState
      notification.success({ message: 'Категорията беше успешно създадена.' })
    })
    builder.addCase(createCategory.rejected, (state, { error }) => {
      state.loadingCreateCategory = false
      notification.error({
        message: `Възникна проблем: ${error.message}`,
        description:
          'Моля опитайте по-късно. Ако проблемът продължава да съществува, моля свържете се с нас.',
        duration: 15
      })
    })
    // get category
    builder.addCase(getCategory.pending, (state) => {
      state.loadingGetCategory = true
    })
    builder.addCase(getCategory.fulfilled, (state, { payload }) => {
      state.loadingGetCategory = false
      state.formState = payload
    })
    builder.addCase(getCategory.rejected, (state, { error }) => {
      state.loadingGetCategory = false
      state.getCategoryError = { message: error.message }
      notification.error({
        message: `Възникна проблем: ${error.message}`,
        description:
          'Моля опитайте по-късно. Ако проблемът продължава да съществува, моля свържете се с нас.',
        duration: 15
      })
    })
    // update category
    builder.addCase(updateCategory.pending, (state) => {
      state.loadingUpdateCategory = true
    })
    builder.addCase(updateCategory.fulfilled, (state, _) => {
      state.loadingUpdateCategory = false
      notification.success({ message: 'Категорията беше обновена успешно!', duration: 5 })
    })
    builder.addCase(updateCategory.rejected, (state, { error }) => {
      state.loadingUpdateCategory = false
      notification.error({
        message: `Възникна проблем: ${error.message}`,
        description:
          'Моля опитайте по-късно. Ако проблемът продължава да съществува, моля свържете се с нас.',
        duration: 15
      })
    })
  }
})
