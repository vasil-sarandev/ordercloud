import { FC } from 'react'
import { AllCategoriesContainer } from '../../../feature/admin/category'
import { LayoutContainer } from '../../../feature/admin/layout'
import { withAuthentication, withVenueOwner } from '../../../feature/auth'
import { Button, CustomLink, PageSeo, STATIC_ROUTES } from '../../../shared'

interface Props {}

const PageAction = (
  <CustomLink as={STATIC_ROUTES.createCategory.as} href={STATIC_ROUTES.createCategory.href}>
    <Button onClick={() => {}}>Нова категория</Button>
  </CustomLink>
)

const AllCategoriesPage: FC<Props> = () => (
  <PageSeo title='Всички категории | Ordercloud'>
    <LayoutContainer title='Всички категории' action={PageAction}>
      <AllCategoriesContainer />
    </LayoutContainer>
  </PageSeo>
)

export default withAuthentication(withVenueOwner(AllCategoriesPage))
