import { RootState } from '../../../state'
import { CreateVenueFormState, ValidateInformationErrors } from './createVenueReducer'

export const getCreateVenueFormState = (state: RootState): CreateVenueFormState =>
  state.createVenue.formState

export const getCreateVenueValidationErrors = (state: RootState): ValidateInformationErrors =>
  state.createVenue.validationErrors

export const getValidateFormLoading = (state: RootState): boolean =>
  state.createVenue.validateFormLoading

export const getCreateVenueLoading = (state: RootState): boolean =>
  state.createVenue.createVenueLoading

export const getCreateVenueRedirectUrl = (state: RootState): string => state.createVenue.redirectUrl
