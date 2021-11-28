import { FC } from 'react'
import { LayoutContainer } from '../../../feature/admin/layout'
import { AllProductsContainer } from '../../../feature/admin/product/container/AllProductsContainer'
import { withAuthentication, withVenueOwner } from '../../../feature/auth'
import { Button, CustomLink, PageSeo, STATIC_ROUTES } from '../../../shared'

interface Props {}

const PageAction = (
  <CustomLink as={STATIC_ROUTES.createProduct.as} href={STATIC_ROUTES.createProduct.href}>
    <Button onClick={() => {}}>Нов продукт</Button>
  </CustomLink>
)

const AllProductsPage: FC<Props> = () => (
  <PageSeo title='Всички продукти | Ordercloud'>
    <LayoutContainer title='Продукти' action={PageAction}>
      <AllProductsContainer />
    </LayoutContainer>
  </PageSeo>
)

export default withAuthentication(withVenueOwner(AllProductsPage))
