import { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { BackButton, STATIC_ROUTES } from '../../../../shared'
import { ProductForm } from '../component'
import { getLoadingCreateProduct, useProduct } from '../ducks'

interface Props {}

export const CreateProductContainer: FC<Props> = () => {
  const isLoading = useSelector(getLoadingCreateProduct)
  const { createProduct, resetForm } = useProduct()
  useEffect(() => {
    resetForm()
  }, [])
  return (
    <>
      <BackButton
        text='Обратно към продукти'
        linkAs={STATIC_ROUTES.products.as}
        linkHref={STATIC_ROUTES.products.href}
      />
      <ProductForm buttonLabel='Запази' handleSubmit={createProduct} isLoading={isLoading} />
    </>
  )
}
