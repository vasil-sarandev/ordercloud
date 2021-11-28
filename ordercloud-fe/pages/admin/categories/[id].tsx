import { useRouter } from 'next/router'
import { FC } from 'react'
import { EditCategoryContainer } from '../../../feature/admin/category'
import { LayoutContainer } from '../../../feature/admin/layout'
import { withAuthentication, withVenueOwner } from '../../../feature/auth'
import { PageSeo } from '../../../shared'

interface Props {}

const CategoryPage: FC<Props> = () => {
  const router = useRouter()
  const {
    query: { id }
  } = router
  return (
    <PageSeo title='Редакция на категория | Ordercloud'>
      <LayoutContainer title='Редакция на категория'>
        <EditCategoryContainer id={id as string} />
      </LayoutContainer>
    </PageSeo>
  )
}

export default withAuthentication(withVenueOwner(CategoryPage))
