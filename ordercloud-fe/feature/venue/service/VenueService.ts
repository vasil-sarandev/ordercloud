/* eslint-disable camelcase */
import axios, { AxiosResponse } from 'axios'
import { Category } from '../../../shared'
import { Venue } from '../model'
import { CreateOrderObject } from '../util/createOrderInfo'

const API_URL = process.env.api_url
const baseURL = `${API_URL}/venue`
const baseURL_ORDER = `${API_URL}/order`

const getVenueData = (venueName: string): Promise<AxiosResponse<Venue>> =>
  axios.get<Venue>(`${baseURL}/menu/${venueName.toLowerCase()}`)

const getVenueInfo = (venueName: string): Promise<AxiosResponse<Venue>> =>
  axios.get<Venue>(`${baseURL}/info/${venueName.toLowerCase()}`)

const getVenueCategories = (venueId: string): Promise<AxiosResponse<Category[]>> =>
  axios.get<Category[]>(`${baseURL}/categories/${venueId}`)

const getVenueNames = (): Promise<AxiosResponse<string[]>> => axios.get<string[]>(`${baseURL}/all`)

const createOrder = (order: CreateOrderObject): Promise<AxiosResponse<string>> =>
  axios.post<string>(`${baseURL_ORDER}/`, order)

export const VenueService = {
  getVenueData,
  getVenueInfo,
  getVenueCategories,
  getVenueNames,
  createOrder
}
