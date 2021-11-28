import { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { BackButton } from '../../../../shared'
import { STATIC_ROUTES } from '../../../../shared/util'
import { CategoryForm } from '../component'
import { getCategoryCreateLoading, useCategory } from '../ducks'

interface Props {}

export const CreateCategoryContainer: FC<Props> = () => {
  const isLoading = useSelector(getCategoryCreateLoading)
  const { createCategory, resetForm } = useCategory()
  useEffect(() => {
    resetForm()
  }, [])
  return (
    <>
      <BackButton
        text='Обратно към категории'
        linkAs={STATIC_ROUTES.categories.as}
        linkHref={STATIC_ROUTES.categories.href}
      />
      <CategoryForm buttonLabel='Запази' handleSubmit={createCategory} isLoading={isLoading} />
    </>
  )
}
