/* eslint-disable no-underscore-dangle */
import { FC, useCallback, useState } from 'react'
import { debounce, isEqual } from 'lodash'
import {
  FetchResponseHandler,
  Pagination,
  initialStateQuery,
  Page,
  Product,
  Input,
  usePaginationFetchWithFilter
} from '../../../../shared'
import styles from '../styles/allProducts.module.css'
import { ProductCard } from '../component'
import { ProductService } from '../service'

interface Props {}

const initialQueryState = initialStateQuery({ limit: 10, count: true })

export const AllProductsContainer: FC<Props> = () => {
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
    getData: ProductService.fetchProducts,
    ...queryState,
    filter
  })

  const loadMoreData = (): void => {
    setQueryState({ ...queryState, next: pagination.next })
  }

  const resetData = () => {
    setQueryState(initialQueryState)
    if (isEqual(queryState, initialQueryState)) refetchData()
  }

  const handleFilterChange = (val) => {
    setQueryState(initialQueryState)
    setFilter(val)
  }

  // eslint-disable-next-line camelcase
  const debounced_filter_change = useCallback(debounce(handleFilterChange, 750), [])

  const productsList = items.map((x: Product) => (
    <ProductCard product={x} key={x._id} refetchData={resetData} />
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
          placeholder='Потърсете продукт...'
          value={filterValue}
          autoComplete='off'
        />
      </div>
      <FetchResponseHandler loading={isLoading} error={error} showSkeleton>
        <div className={styles.listContainer}>{productsList}</div>
      </FetchResponseHandler>
      <Pagination
        loading={isLoadingMore}
        total={pagination.count}
        count={items.length}
        cmsTexts={{ countInfoText: 'продукта показани' }}
        onLoadMore={loadMoreData}
      />
    </>
  )
}
