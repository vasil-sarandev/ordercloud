import { ErrorType, OrderingType } from '../../../../shared'
import { RootState } from '../../../state'
import { Venue } from '../../model'

export const getFetchCategoriesLoading = (state: RootState): boolean =>
  state.venue.fetchCategoriesLoading
export const getFetchCategoriesError = (state: RootState): ErrorType =>
  state.venue.fetchCategoriesError
export const getCurrentCategory = (state: RootState): string => state.venue.currentCategory
export const getVenue = (state: RootState): Venue => state.venue.venue
export const getOrderingEnabled = (state: RootState): boolean => state.venue.orderingEnabled
export const getOrderingType = (state: RootState): OrderingType => state.venue.orderingType
