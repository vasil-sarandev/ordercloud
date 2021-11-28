/* eslint-disable no-underscore-dangle */
import { FC, useCallback, useState } from 'react'
import { debounce } from 'lodash'
import {
  FetchResponseHandler,
  Pagination,
  initialStateQuery,
  Page,
  Input,
  usePaginationFetchWithFilter
} from '../../../shared'
import styles from '../styles/container.module.css'
import { SuperAdminService } from '../service'
import { Venue } from '../../venue'
import { VenueCard } from '../component'

interface Props {}

const initialQueryState = initialStateQuery({ limit: 5, count: true })

export const SuperAdminContainer: FC<Props> = () => {
  const [filterValue, setFilterValue] = useState('')
  const [filter, setFilter] = useState('')
  const [queryState, setQueryState] = useState<Page>(initialQueryState)
  const { error, isLoading, isLoadingMore, items, pagination } = usePaginationFetchWithFilter({
    getData: SuperAdminService.fetchVenues,
    ...queryState,
    filter
  })

  const loadMoreData = (): void => {
    setQueryState({ ...queryState, next: pagination.next })
  }

  const handleFilterChange = (val) => {
    setQueryState(initialQueryState)
    setFilter(val)
  }

  // eslint-disable-next-line camelcase
  const debounced_filter_change = useCallback(debounce(handleFilterChange, 750), [])

  const venuesList = items.map((x: Venue) => <VenueCard venue={x} key={x.slug} />)

  return (
    <>
      <div className={styles.filterContainer}>
        <Input
          name='filter'
          onChange={(name, val) => {
            setFilterValue(val)
            debounced_filter_change(val)
          }}
          placeholder='Потърсете заведение...'
          value={filterValue}
          autoComplete='off'
        />
      </div>
      <FetchResponseHandler loading={isLoading} error={error} showSkeleton>
        <div className={styles.listContainer}>{venuesList}</div>
      </FetchResponseHandler>
      <Pagination
        loading={isLoadingMore}
        total={pagination.count}
        count={items.length}
        cmsTexts={{ countInfoText: 'заведения показани' }}
        onLoadMore={loadMoreData}
      />
    </>
  )
}
