/* eslint-disable camelcase */
import axios, { AxiosResponse } from 'axios'
import { Page, Product, OptionType } from '../../../../shared'
import { ProductFormState } from '../ducks'

const API_URL = process.env.api_url
const baseURL_product = `${API_URL}/product`

interface fetchProductsResponse {
  paging: Page
  items: Array<Product>
}

const createProduct = (object: FormData): Promise<AxiosResponse<Product>> =>
  axios.post<Product>(`${baseURL_product}`, object)

const updateProduct = (id, object: FormData): Promise<AxiosResponse<Product>> =>
  axios.patch<Product>(`${baseURL_product}/${id}`, object)

const getCategoryOptions = (): Promise<AxiosResponse<OptionType[]>> =>
  axios.get<OptionType[]>(`${baseURL_product}/categoryOptions`)

const getProduct = (id: string): Promise<AxiosResponse<ProductFormState>> =>
  axios.get<ProductFormState>(`${baseURL_product}/${id}`)

const deleteProduct = (id: string): Promise<AxiosResponse> =>
  axios.delete(`${baseURL_product}/${id}`)

const fetchProducts = (pagination: Page, filter): Promise<AxiosResponse<fetchProductsResponse>> =>
  axios.post<fetchProductsResponse>(`${baseURL_product}/pagination`, { pagination, filter })

export const ProductService = {
  createProduct,
  getCategoryOptions,
  getProduct,
  updateProduct,
  fetchProducts,
  deleteProduct
}
