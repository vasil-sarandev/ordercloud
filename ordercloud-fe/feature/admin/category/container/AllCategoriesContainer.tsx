/* eslint-disable no-underscore-dangle */
import { FC, useCallback, useState } from 'react'
import { debounce, isEqual } from 'lodash'
import {
  FetchResponseHandler,
  Pagination,
  initialStateQuery,
  Page,
  Input,
  Category,
  usePaginationFetchWithFilter
} from '../../../../shared'
import styles from '../styles/allCategories.module.css'
import { CategoryService } from '../service'
import { CategoryCard } from '../component/CategoryCard'

interface Props {}

const initialQueryState = initialStateQuery({ limit: 10, count: true })

export const AllCategoriesContainer: FC<Props> = () => {
  const [filterValue, setFilterValue] = useState('')
  const [filter, setFilter] = useState('')

  const [queryState, setQueryState] = useState<Page>(initialQueryState)
  const {
    error,
    isLoading,
    isLoadingMore,
    items,
    pagination,
    refetchData
  } = usePaginationFetchWithFilter({
    getData: CategoryService.fetchCategories,
    ...queryState,
    filter
  })

  const loadMoreData = (): void => {
    setQueryState({ ...queryState, next: pagination.next })
  }

  const resetData = () => {
    setQueryState(initialQueryState)
    // other updates will be triggered by component.
    if (isEqual(queryState, initialQueryState)) refetchData()
  }

  const handleFilterChange = (val) => {
    setQueryState(initialQueryState)
    setFilter(val)
  }

  // eslint-disable-next-line camelcase
  const debounced_filter_change = useCallback(debounce(handleFilterChange, 750), [])

  const categoriesList = items.map((x: Category) => (
    <CategoryCard category={x} refetchData={resetData} key={x._id} />
  ))

  return (
    <>
      <div className={styles.filterContainer}>
        <Input
          name='filter'
          onChange={(name, val) => {
            setFilterValue(val)
            debounced_filter_change(val)
          }}
          placeholder='Потърсете категория...'
          value={filterValue}
          autoComplete='off'
        />
      </div>
      <FetchResponseHandler loading={isLoading} error={error} showSkeleton>
        <div className={styles.listContainer}>{categoriesList}</div>
      </FetchResponseHandler>
      <Pagination
        loading={isLoadingMore}
        total={pagination.count}
        count={items.length}
        cmsTexts={{ countInfoText: 'категории показани' }}
        onLoadMore={loadMoreData}
      />
    </>
  )
}
