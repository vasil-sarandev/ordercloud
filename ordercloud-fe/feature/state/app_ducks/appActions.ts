/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getErrorMessage } from '../../../shared'
import { checkIfUserIsVenueOwner, VenueOwnerResponse } from './service'

export const checkIfIsVenueOwner = createAsyncThunk(
  'app/checkIfIsVenueOwner',
  async (): Promise<VenueOwnerResponse> => {
    const resp = await checkIfUserIsVenueOwner()
    return resp
  }
)

export const setAccessToken = createAsyncThunk(
  'app/setAccessToken',
  async (getAccessTokenSilently: any): Promise<string> => {
    try {
      const auth0_audience = process.env.auth0_audience
      const accessToken = await getAccessTokenSilently({
        audience: auth0_audience,
        scope: 'read:current_user'
      })
      return accessToken
    } catch (e) {
      if (e.message === 'Login required') return null
      throw new Error(getErrorMessage(e).message)
    }
  }
)
