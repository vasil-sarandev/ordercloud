import { useCallback, useEffect, useState } from 'react'
import { ErrorType, getErrorMessage, Order } from '../../../../shared'
import { OrderService } from '../service'

interface GetOrderType {
  isLoading: boolean
  order: Order
  error: ErrorType
  refetchData: () => void
}

export const useGetOrder = (id: string): GetOrderType => {
  const [order, setOrder] = useState(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<ErrorType>(undefined)

  const refetchData = useCallback(async (): Promise<void> => {
    setIsLoading(true)
    try {
      const { data } = await OrderService.getOrder(id)
      setOrder(data)
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
      setError(getErrorMessage(e))
    }
  }, [])

  useEffect(() => {
    // initial call
    refetchData()
  }, [refetchData])

  return {
    error,
    isLoading,
    order,
    refetchData
  }
}
