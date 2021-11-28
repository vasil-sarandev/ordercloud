import { useAppDispatch } from '..'
import { checkIfIsVenueOwner, setAccessToken as setAccessTokenAction } from './appActions'

interface UseApp {
  checkIfVenueOwner: () => void
  setAccessToken: (getAccessTokenSilently: any) => void
}

export const useApp = (): UseApp => {
  const dispatch = useAppDispatch()

  const checkIfVenueOwner = () => {
    dispatch(checkIfIsVenueOwner())
  }

  const setAccessToken = (getAccessTokenSilently) => {
    dispatch(setAccessTokenAction(getAccessTokenSilently))
  }

  return { checkIfVenueOwner, setAccessToken }
}
