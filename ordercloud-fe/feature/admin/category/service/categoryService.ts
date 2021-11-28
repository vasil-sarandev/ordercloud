/* eslint-disable camelcase */
import axios, { AxiosResponse } from 'axios'
import { Category, Page } from '../../../../shared'
import { CategoryFormState } from '../ducks'

const API_URL = process.env.api_url
const baseURL_category = `${API_URL}/category`

interface fetchCategoriesResponse {
  paging: Page
  items: Array<Category>
}

const createCategory = (object: FormData): Promise<AxiosResponse<Category>> =>
  axios.post<Category>(`${baseURL_category}`, object)

const updateCategory = (id, object: FormData): Promise<AxiosResponse<Category>> =>
  axios.patch<Category>(`${baseURL_category}/${id}`, object)

const getCategory = (id: string): Promise<AxiosResponse<CategoryFormState>> =>
  axios.get<CategoryFormState>(`${baseURL_category}/${id}`)

const fetchCategories = (
  pagination: Page,
  filter
): Promise<AxiosResponse<fetchCategoriesResponse>> =>
  axios.post<fetchCategoriesResponse>(`${baseURL_category}/pagination`, { pagination, filter })

const deleteCategory = (id: string): Promise<AxiosResponse> =>
  axios.delete(`${baseURL_category}/${id}`)

export const CategoryService = {
  createCategory,
  getCategory,
  updateCategory,
  fetchCategories,
  deleteCategory
}
