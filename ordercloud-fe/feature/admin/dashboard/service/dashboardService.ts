/* eslint-disable camelcase */
import axios from 'axios'
import { getErrorMessage } from '../../../../shared'

const API_URL = process.env.api_url
const baseURL_dashboard = `${API_URL}/venue`

const getMySlug = async (): Promise<string> => {
  try {
    const resp = await axios.get<string>(`${baseURL_dashboard}/slug/mine`)
    return resp.data
  } catch (e) {
    throw new Error(getErrorMessage(e).message)
  }
}

export const DashboardService = {
  getMySlug
}
