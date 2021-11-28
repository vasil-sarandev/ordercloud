import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../../state'
import { ProductService } from '../service'
import { createProductInfo, transformProductResponse } from '../util'
import { ProductState } from './productReducer'

export type formFieldKeys =
  | 'name'
  | 'image'
  | 'details'
  | 'price'
  | 'quantity'
  | 'category'
  | 'additions'

interface SetFormFieldAction {
  which: formFieldKeys
  value: any
}

interface SetAdditionFormFieldAction extends SetFormFieldAction {
  index: number
}

export const setFormField = (
  state: ProductState,
  { payload }: PayloadAction<SetFormFieldAction>
) => {
  const { which, value } = payload
  const newFormState = { ...state.formState, [which]: value }
  state.formState = newFormState
}

export const setLoadingCreateProduct = (
  state: ProductState,
  { payload }: PayloadAction<boolean>
) => {
  state.loadingCreateProduct = payload
}

export const setAdditionFormField = (
  state: ProductState,
  { payload }: PayloadAction<SetAdditionFormFieldAction>
) => {
  const { index, which, value } = payload
  const newAdditions = [...state.formState.additions]
  newAdditions[index][which] = value
  state.formState = {
    ...state.formState,
    additions: newAdditions
  }
}

export const removeAddition = (
  state: ProductState,
  { payload }: PayloadAction<{ index: number }>
) => {
  const { index } = payload
  const newAdditions = [...state.formState.additions]
  newAdditions.splice(index, 1)
  state.formState = {
    ...state.formState,
    additions: newAdditions
  }
}

export const addAddition = (state: ProductState) => {
  const newAdditions = [...state.formState.additions]
  newAdditions.push({ name: null, price: null })
  state.formState = {
    ...state.formState,
    additions: newAdditions
  }
}

export const resetForm = (state: ProductState) => {
  state.formState = {
    name: null,
    image: [],
    details: null,
    price: null,
    quantity: null,
    category: null,
    additions: []
  }
}

export const createProduct = createAsyncThunk('product/create', async (_, { getState }) => {
  const state: RootState = getState() as RootState
  const productObject = createProductInfo(state.product.formState)
  await ProductService.createProduct(productObject)
})

export const updateProduct = createAsyncThunk(
  'product/update',
  async (id: string, { getState }) => {
    const state: RootState = getState() as RootState
    const productObject = createProductInfo(state.product.formState)
    await ProductService.updateProduct(id, productObject)
  }
)

export const getProduct = createAsyncThunk('product/get', async (id: string, _) => {
  const resp = await ProductService.getProduct(id)
  return transformProductResponse(resp.data)
})
