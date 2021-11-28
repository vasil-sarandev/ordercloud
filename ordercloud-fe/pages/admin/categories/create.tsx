import { FC } from 'react'
import { CreateCategoryContainer } from '../../../feature/admin/category'
import { LayoutContainer } from '../../../feature/admin/layout'
import { withAuthentication, withVenueOwner } from '../../../feature/auth'
import { PageSeo } from '../../../shared'

interface Props {}

const CreateCategoryPage: FC<Props> = () => (
  <PageSeo title='Създаване на категория | Ordercloud'>
    <LayoutContainer title='Създаване на категория'>
      <CreateCategoryContainer />
    </LayoutContainer>
  </PageSeo>
)

export default withAuthentication(withVenueOwner(CreateCategoryPage))
