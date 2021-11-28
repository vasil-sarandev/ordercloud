/* eslint-disable camelcase */
import axios, { AxiosResponse } from 'axios'
import { Page } from '../../../shared'
import { Venue } from '../../venue'

const API_URL = process.env.api_url
const baseURL_category = `${API_URL}/superAdmin`

interface fetchVenuesResponse {
  paging: Page
  items: Array<Venue>
}

const fetchVenues = (
  pagination: Page,
  filter: string
): Promise<AxiosResponse<fetchVenuesResponse>> =>
  axios.post<fetchVenuesResponse>(`${baseURL_category}/venues`, { pagination, filter })

export const SuperAdminService = {
  fetchVenues
}
