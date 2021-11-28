import { FC } from 'react'
import { LayoutContainer } from '../../../feature/admin/layout'
import { withAuthentication, withVenueOwner } from '../../../feature/auth'
import { CreateProductContainer } from '../../../feature/admin/product'
import { PageSeo } from '../../../shared'

interface Props {}

const CreateProductPage: FC<Props> = () => (
  <PageSeo title='Създаване на продукт | Ordercloud'>
    <LayoutContainer title='Създаване на продукт'>
      <CreateProductContainer />
    </LayoutContainer>
  </PageSeo>
)

export default withAuthentication(withVenueOwner(CreateProductPage))
