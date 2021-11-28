import axios from 'axios'

const API_URL = process.env.api_url
const endpointURL = `${API_URL}/venue/mine`

export interface VenueOwnerResponse {
  isVenueOwner: boolean
  venueId?: string
}

export const checkIfUserIsVenueOwner = async (): Promise<VenueOwnerResponse> => {
  const resp = (await axios.get<VenueOwnerResponse>(`${endpointURL}`)).data
  return resp
}
