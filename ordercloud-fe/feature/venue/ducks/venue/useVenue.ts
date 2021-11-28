import { OrderingType } from '../../../../shared'
import { useAppDispatch } from '../../../state'
import { fetchCategories as fetchCategoriesAction, venueActions } from './venueReducer'

interface UseVenue {
  fetchCategories: () => void
  setCurrentCategory: (category: string) => void
  setOrderingEnabled: (val: boolean) => void
  setOrderingType: (type: OrderingType) => void
  setOnSiteLocation: (location: string) => void
}

export const useVenue = (): UseVenue => {
  const dispatch = useAppDispatch()

  const fetchCategories = (): void => {
    dispatch(fetchCategoriesAction())
  }
  const setCurrentCategory = (category: string): void => {
    dispatch(venueActions.setCurrentCategory(category))
  }

  const setOrderingEnabled = (val: boolean): void => {
    dispatch(venueActions.setOrderingEnabled(val))
  }

  const setOrderingType = (type: OrderingType): void => {
    dispatch(venueActions.setOrderingType(type))
  }

  const setOnSiteLocation = (location: string): void => {
    dispatch(venueActions.setOnSiteLocation(location))
  }

  return {
    fetchCategories,
    setCurrentCategory,
    setOrderingEnabled,
    setOrderingType,
    setOnSiteLocation
  }
}
