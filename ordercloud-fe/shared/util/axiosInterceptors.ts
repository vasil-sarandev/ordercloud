import axios from 'axios'

export const useAxiosInterceptors = () => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.data) return Promise.reject(error.response.data)
      return Promise.reject(error)
    }
  )
}
