/* eslint-disable camelcase */
import axios, { AxiosResponse } from 'axios'
import { Order, Page } from '../../../../shared'

const API_URL = process.env.api_url
const baseURL_orders = `${API_URL}/order`

interface fetchOrdersResponse {
  paging: Page
  items: Array<Order>
}

const fetchOrders = (pagination: Page): Promise<AxiosResponse<fetchOrdersResponse>> =>
  axios.post<fetchOrdersResponse>(`${baseURL_orders}/pagination`, { pagination })

const getOrder = (id: string): Promise<AxiosResponse<Order>> =>
  axios.get<Order>(`${baseURL_orders}/${id}`)

const completeOrder = (id: string): Promise<void> => axios.put(`${baseURL_orders}/${id}/complete`)

export const OrderService = {
  fetchOrders,
  getOrder,
  completeOrder
}
