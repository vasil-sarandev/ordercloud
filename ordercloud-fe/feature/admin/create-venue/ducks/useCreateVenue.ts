import { useAppDispatch } from '../../../state'
import {
  formFieldKeys,
  validationErrorKeys,
  createVenue as createVenueAction
} from './createVenueActions'
import { createVenueActions } from './createVenueReducer'

interface UseCreateVenue {
  setFormField: (which: formFieldKeys, value: any) => void
  setValidationError: (which: validationErrorKeys, value: any) => void
  setValidateFormLoading: (value: boolean) => void
  createVenue: () => void
}

export const useCreateVenue = (): UseCreateVenue => {
  const dispatch = useAppDispatch()

  const setFormField = (which: formFieldKeys, value: any) => {
    dispatch(createVenueActions.setFormField({ which, value }))
  }

  const setValidationError = (which: validationErrorKeys, value: any) => {
    dispatch(createVenueActions.setValidationError({ which, value }))
  }

  const setValidateFormLoading = (val: boolean) => {
    dispatch(createVenueActions.setValidateFormLoading(val))
  }

  const createVenue = () => {
    dispatch(createVenueAction())
  }

  return {
    setFormField,
    setValidationError,
    setValidateFormLoading,
    createVenue
  }
}
