import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { notification } from '../../../shared/components'
import { checkIfIsVenueOwner, setAccessToken } from './appActions'

export interface AppReducerState {
  isVenueOwner: boolean
  isVenueOwnerLoading: boolean
  venueId: string
  accessToken: string
  isAccessTokenLoading: boolean
}

const initialState: AppReducerState = {
  isVenueOwner: null,
  isVenueOwnerLoading: false,
  venueId: null,
  accessToken: null,
  isAccessTokenLoading: false
}
export { initialState as initialStateApp }

export const { reducer: appReducer, actions: appActions } = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // check if is venue owner
    builder.addCase(checkIfIsVenueOwner.pending, (state) => {
      state.isVenueOwnerLoading = true
    })
    builder.addCase(checkIfIsVenueOwner.fulfilled, (state, { payload }) => {
      state.isVenueOwner = payload.isVenueOwner
      state.venueId = payload.venueId
      state.isVenueOwnerLoading = false
    })
    builder.addCase(checkIfIsVenueOwner.rejected, (state) => {
      notification.error({
        message: 'An unexpected problem has occured. Please try again later.'
      })
      // dont stop the loading state. no point in letting users continue.
      // state.isVenueOwnerLoading = false
      state.isVenueOwner = false
    })

    // set access token
    builder.addCase(setAccessToken.pending, (state) => {
      state.isAccessTokenLoading = true
    })
    builder.addCase(setAccessToken.fulfilled, (state, { payload }) => {
      axios.defaults.headers.common = { Authorization: `Bearer ${payload}` }
      state.accessToken = payload
      state.isAccessTokenLoading = false
    })
    builder.addCase(setAccessToken.rejected, (state) => {
      notification.error({
        message: 'An unexpected problem has occured. Please try again later.'
      })
      // dont stop the loading state. no point in letting users continue.
      // state.isAccessTokenLoading = false
      state.accessToken = null
    })
  }
})
