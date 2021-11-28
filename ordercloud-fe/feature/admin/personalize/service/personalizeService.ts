/* eslint-disable camelcase */
import axios, { AxiosResponse } from 'axios'
import { getErrorMessage } from '../../../../shared'
import { Venue } from '../../../venue'
import { PersonalizationFormState, transformProfileResponse } from '../util'

const API_URL = process.env.api_url
const baseURL_personalize = `${API_URL}/venue`

const getPersonalizationProfile = async (): Promise<PersonalizationFormState> => {
  try {
    const resp = await axios.get<Venue>(`${baseURL_personalize}/personalization`)
    return transformProfileResponse(resp.data)
  } catch (e) {
    throw new Error(getErrorMessage(e).message)
  }
}

const submitProfile = (object: FormData): Promise<AxiosResponse<Venue>> =>
  axios.patch<Venue>(`${baseURL_personalize}`, object)

export const PersonalizationService = {
  getPersonalizationProfile,
  submitProfile
}
