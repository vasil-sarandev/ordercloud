import { createSlice } from '@reduxjs/toolkit'
import { STATIC_ROUTES, notification } from '../../../../shared'
import {
  setFormField,
  setValidationError,
  setValidateFormLoading,
  createVenue
} from './createVenueActions'

export interface CreateVenueFormState {
  name?: string
  slug?: string
  logo?: any
  cover?: any
  primaryColor: string
  secondaryColor: string
  enableOrders: boolean
  announcement?: string
}

export interface ValidateInformationErrors {
  name?: string
  slug?: string
}

export interface CreateVenueState {
  formState: CreateVenueFormState
  validationErrors: ValidateInformationErrors
  validateFormLoading: boolean
  createVenueLoading: boolean
  redirectUrl: string
}

const initialState: CreateVenueState = {
  formState: {
    enableOrders: true,
    primaryColor: '#ff6900',
    secondaryColor: '#7bdcb5'
  },
  createVenueLoading: false,
  validationErrors: {},
  validateFormLoading: false,
  redirectUrl: ''
}
export { initialState as initialStateCreateVenue }

export const { reducer: createVenueReducer, actions: createVenueActions } = createSlice({
  name: 'createVenue',
  initialState,
  reducers: {
    setFormField,
    setValidationError,
    setValidateFormLoading
  },
  extraReducers: (builder) => {
    builder.addCase(createVenue.pending, (state) => {
      state.createVenueLoading = true
    })
    builder.addCase(createVenue.fulfilled, (state) => {
      state.createVenueLoading = false
      state.formState = initialState.formState
      state.validateFormLoading = false
      state.validationErrors = {}
      state.redirectUrl = STATIC_ROUTES.dashboard.as
      notification.success({ message: 'Заведението беше успешно създадено.' })
    })
    builder.addCase(createVenue.rejected, (state) => {
      state.createVenueLoading = false
      notification.error({
        message: 'Възникна проблем.',
        description:
          'Моля опитайте по-късно. Ако проблемът продължава да съществува, моля свържете се с нас.',
        duration: 15
      })
    })
  }
})
