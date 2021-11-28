import { AxiosResponse } from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { ErrorType } from '../components'
import { Page, Paging } from '../model'
import { getErrorMessage } from '../util'

interface PaginationFetchProps extends Page {
  getData: (pagination: Page) => Promise<AxiosResponse>
}
export const usePaginationFetch = ({ getData, next, count, limit }: PaginationFetchProps) => {
  const [items, setItems] = useState<Array<any>>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false)
  const [error, setError] = useState<ErrorType>(undefined)
  const [pagination, setPagination] = useState<Paging>({})

  const refetchData = useCallback(async (): Promise<void> => {
    const isInitialLoad = !next
    setIsLoading(isInitialLoad)
    setIsLoadingMore(!isInitialLoad)
    try {
      const {
        data: { data, paging }
      } = await getData({ next, count, limit })
      setItems((prevItems) => (next ? prevItems.concat(data) : data))
      setPagination(paging || {})
      setIsLoading(false)
      setIsLoadingMore(false)
    } catch (e) {
      setIsLoading(false)
      setIsLoadingMore(false)
      setError(getErrorMessage(e))
    }
  }, [next, limit, count])

  useEffect(() => {
    // initial call
    refetchData()
  }, [refetchData])

  return {
    error,
    isLoading,
    isLoadingMore,
    items,
    pagination,
    refetchData
  }
}
