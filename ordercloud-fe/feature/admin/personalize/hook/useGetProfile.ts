import { useCallback, useEffect, useState } from 'react'
import { ErrorType, getErrorMessage } from '../../../../shared'
import { PersonalizationService } from '../service'
import { PersonalizationFormState } from '../util'

interface GetProfileType {
  isLoading: boolean
  data: PersonalizationFormState
  error: ErrorType
  refetchData: () => void
}

export const useGetProfile = (): GetProfileType => {
  const [data, setData] = useState<PersonalizationFormState>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<ErrorType>(undefined)

  const refetchData = useCallback(async (): Promise<void> => {
    setIsLoading(true)
    try {
      const resp = await PersonalizationService.getPersonalizationProfile()
      setData(resp)
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
    data,
    refetchData
  }
}
