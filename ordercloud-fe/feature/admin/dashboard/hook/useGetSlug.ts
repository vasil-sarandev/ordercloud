import { useCallback, useEffect, useState } from 'react'
import { ErrorType, getErrorMessage } from '../../../../shared'
import { DashboardService } from '../service'

interface GetSlugType {
  isLoading: boolean
  slug: string
  error: ErrorType
}

export const useGetSlug = (): GetSlugType => {
  const [slug, setSlug] = useState<string>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<ErrorType>(undefined)

  const refetchData = useCallback(async (): Promise<void> => {
    setIsLoading(true)
    try {
      const resp = await DashboardService.getMySlug()
      setSlug(resp)
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
    slug
  }
}
