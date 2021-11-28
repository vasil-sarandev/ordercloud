import { isEmpty, pickBy } from 'lodash'
import { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { BackButton, FetchResponseHandler, STATIC_ROUTES } from '../../../../shared'
import { getProductFormState } from '../../product'
import { CategoryForm } from '../component'
import {
  getGetCategoryError,
  getLoadingGetCategory,
  getLoadingUpdateCategory,
  useCategory
} from '../ducks'

interface Props {
  id: string
}

export const EditCategoryContainer: FC<Props> = ({ id }) => {
  const { getCategory, updateCategory } = useCategory()
  const isLoadingCategory = useSelector(getLoadingGetCategory)
  const isLoadingUpdate = useSelector(getLoadingUpdateCategory)
  const getCategoryError = useSelector(getGetCategoryError)
  const formState = useSelector(getProductFormState)
  const noData = isEmpty(pickBy(formState))
  useEffect(() => {
    getCategory(id)
  }, [])
  const handleSubmit = () => updateCategory(id)
  return (
    <>
      <BackButton
        text='Обратно към категории'
        linkAs={STATIC_ROUTES.categories.as}
        linkHref={STATIC_ROUTES.categories.href}
      />

      <FetchResponseHandler
        loading={isLoadingCategory}
        isDataEmpty={noData}
        error={getCategoryError}
        showSkeleton
        dataEmptyMessage='Категорията не съществува или не успяхме да го заредим.'
      >
        <CategoryForm
          buttonLabel='Запази'
          handleSubmit={handleSubmit}
          isLoading={isLoadingUpdate}
        />
      </FetchResponseHandler>
    </>
  )
}
