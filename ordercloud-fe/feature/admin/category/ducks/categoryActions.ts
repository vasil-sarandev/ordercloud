import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../../state'
import { CategoryService } from '../service'
import { createCategoryInfo, transformCategoryResponse } from '../util'
import { CategoryState } from './categoryReducer'

export type formFieldKeys = 'name' | 'image'

interface SetFormFieldAction {
  which: formFieldKeys
  value: any
}

export const setFormField = (
  state: CategoryState,
  { payload }: PayloadAction<SetFormFieldAction>
) => {
  const { which, value } = payload
  const newFormState = { ...state.formState, [which]: value }
  state.formState = newFormState
}

export const resetForm = (state: CategoryState) => {
  state.formState = {
    title: null,
    image: []
  }
}

export const setLoadingCreateCategory = (
  state: CategoryState,
  { payload }: PayloadAction<boolean>
) => {
  state.loadingCreateCategory = payload
}

export const createCategory = createAsyncThunk('category/create', async (_, { getState }) => {
  const state: RootState = getState() as RootState
  const categoryObject = createCategoryInfo(state.category.formState)
  await CategoryService.createCategory(categoryObject)
})

export const updateCategory = createAsyncThunk(
  'category/update',
  async (id: string, { getState }) => {
    const state: RootState = getState() as RootState
    const categoryObject = createCategoryInfo(state.category.formState)
    await CategoryService.updateCategory(id, categoryObject)
  }
)

export const getCategory = createAsyncThunk('category/get', async (id: string, _) => {
  const resp = await CategoryService.getCategory(id)
  return transformCategoryResponse(resp.data)
})
