import { isEmpty, pickBy } from 'lodash'
import { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { BackButton, FetchResponseHandler, STATIC_ROUTES } from '../../../../shared'
import { ProductForm } from '../component'
import {
  getGetProductError,
  getLoadingGetProduct,
  getLoadingUpdateProduct,
  getProductFormState,
  useProduct
} from '../ducks'

interface Props {
  id: string
}

export const EditProductContainer: FC<Props> = ({ id }) => {
  const isLoadingFetch = useSelector(getLoadingGetProduct)
  const isLoadingUpdate = useSelector(getLoadingUpdateProduct)
  const formState = useSelector(getProductFormState)
  const getProductError = useSelector(getGetProductError)
  const { getProduct, updateProduct } = useProduct()
  const noData = isEmpty(pickBy(formState))
  useEffect(() => {
    getProduct(id)
  }, [])
  const handleSubmit = () => updateProduct(id)
  return (
    <>
      <BackButton
        text='Обратно към продукти'
        linkAs={STATIC_ROUTES.products.as}
        linkHref={STATIC_ROUTES.products.href}
      />
      <FetchResponseHandler
        loading={isLoadingFetch}
        isDataEmpty={noData}
        error={getProductError}
        showSkeleton
        dataEmptyMessage='Продуктът не съществува или не успяхме да го заредим.'
      >
        <ProductForm buttonLabel='Запази' handleSubmit={handleSubmit} isLoading={isLoadingUpdate} />
      </FetchResponseHandler>
    </>
  )
}
