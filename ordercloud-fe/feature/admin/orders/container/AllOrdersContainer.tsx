/* eslint-disable no-underscore-dangle */
import { FC, useEffect, useState } from 'react'
import socketIOClient from 'socket.io-client'
import { useSelector } from 'react-redux'
import {
  FetchResponseHandler,
  Pagination,
  initialStateQuery,
  Page,
  usePaginationFetch,
  Order
} from '../../../../shared'
import styles from '../styles/allOrders.module.css'
import { OrderService } from '../service'
import { OrderCard } from '../component'
import { getVenueId } from '../../../state/app_ducks'

interface Props {}

const initialQueryState = initialStateQuery({ limit: 5, count: true })

export const AllOrdersContainer: FC<Props> = () => {
  const venueId = useSelector(getVenueId)
  const [queryState, setQueryState] = useState<Page>(initialQueryState)
  const { error, isLoading, isLoadingMore, items, pagination, refetchData } = usePaginationFetch({
    getData: OrderService.fetchOrders,
    ...queryState
  })

  const resetData = () => {
    setQueryState({ ...initialQueryState })
    refetchData()
  }

  useEffect(() => {
    const socket = socketIOClient(process.env.api_url)
    socket.on(venueId, () => {
      resetData()
    })
    return () => {
      socket.disconnect()
    }
  }, [])

  const loadMoreData = (): void => {
    setQueryState({ ...queryState, next: pagination.next })
  }

  const ordersList = items.map((x: Order) => <OrderCard order={x} key={x._id} />)

  return (
    <>
      <FetchResponseHandler loading={isLoading} error={error} showSkeleton>
        <div className={styles.listContainer}>{ordersList}</div>
      </FetchResponseHandler>
      <Pagination
        loading={isLoadingMore}
        total={pagination.count}
        count={items.length}
        cmsTexts={{ countInfoText: 'поръчки показани' }}
        onLoadMore={loadMoreData}
      />
    </>
  )
}
