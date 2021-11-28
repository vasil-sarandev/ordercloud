import { useRouter } from 'next/router'
import { FC } from 'react'
import { LayoutContainer } from '../../../feature/admin/layout'
import { EditProductContainer } from '../../../feature/admin/product'
import { withAuthentication, withVenueOwner } from '../../../feature/auth'
import { PageSeo } from '../../../shared'

interface Props {}

const ProductPage: FC<Props> = () => {
  const router = useRouter()
  const {
    query: { id }
  } = router
  return (
    <PageSeo title='Редакция на продукт | Ordercloud'>
      <LayoutContainer title='Редакция на продукт'>
        <EditProductContainer id={id as string} />
      </LayoutContainer>
    </PageSeo>
  )
}

export default withAuthentication(withVenueOwner(ProductPage))
