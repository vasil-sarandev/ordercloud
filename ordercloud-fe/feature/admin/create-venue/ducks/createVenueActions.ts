import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../../state'
import { Venue } from '../../../venue/model'
import { CreateVenueService } from '../service'
import { createVenueInfo } from '../util'
import { CreateVenueState } from './createVenueReducer'

export type formFieldKeys = 'name' | 'slug' | 'logo' | 'cover' | 'primaryColor' | 'secondaryColor'
export type validationErrorKeys = 'name' | 'slug'

interface SetFormFieldAction {
  which: formFieldKeys
  value: any
}

interface SetValidationErrorAction {
  which: validationErrorKeys
  value: string
}

export const setFormField = (
  state: CreateVenueState,
  { payload }: PayloadAction<SetFormFieldAction>
) => {
  const { which, value } = payload
  const newFormState = { ...state.formState, [which]: value }
  state.formState = newFormState
}

export const setValidationError = (
  state: CreateVenueState,
  { payload }: PayloadAction<SetValidationErrorAction>
) => {
  const { which, value } = payload
  const newValidationErrors = { ...state.validationErrors, [which]: value }
  state.validationErrors = newValidationErrors
}

export const setValidateFormLoading = (
  state: CreateVenueState,
  { payload }: PayloadAction<boolean>
) => {
  state.validateFormLoading = payload
}

export const createVenue = createAsyncThunk('createVenue/createVenue', async (_, { getState }) => {
  const state: RootState = getState() as RootState
  const venueObject = createVenueInfo(state.createVenue.formState)
  const resp: Venue = (await CreateVenueService.createVenue(venueObject)).data
  return resp
})
