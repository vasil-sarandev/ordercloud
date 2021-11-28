import { RootState } from '..'

export const getAppIsVenueOwnerLoading = (state: RootState): boolean =>
  state.app.isVenueOwnerLoading
export const getAppIsVenueOwner = (state: RootState): boolean => state.app.isVenueOwner
export const getVenueId = (state: RootState): string => state.app.venueId
export const getAppAccessToken = (state: RootState): string => state.app.accessToken
export const getAppIsAccessTokenLoading = (state: RootState): boolean =>
  state.app.isAccessTokenLoading
