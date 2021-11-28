import { useCallback, useEffect, useState } from 'react'
import { getErrorMessage, notification } from '../../../../shared'
import { OrderService } from '../service'

interface GetOrderType {
  isLoading: boolean
  completeOrder: () => Promise<void>
}

export const useCompleteOrder = (id: string): GetOrderType => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const completeOrder = useCallback(async (): Promise<void> => {
    setIsLoading(true)
    try {
      await OrderService.completeOrder(id)
      notification.success({ message: 'Поръчката беше завършена!' })
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
      notification.error(getErrorMessage(e))
    }
  }, [])

  return {
    isLoading,
    completeOrder
  }
}
