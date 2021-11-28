import { useRouter } from 'next/router'
import { FC } from 'react'
import { LayoutContainer } from '../../../feature/admin/layout'
import { ViewOrderContainer } from '../../../feature/admin/orders'
import { withAuthentication, withVenueOwner } from '../../../feature/auth'
import { PageSeo } from '../../../shared'

interface Props {}

const OrderPage: FC<Props> = () => {
  const router = useRouter()
  const {
    query: { id }
  } = router
  return (
    <PageSeo title='Детайли за поръчка | Ordercloud'>
      <LayoutContainer title='Детайли за поръчка'>
        <ViewOrderContainer id={id as string} />
      </LayoutContainer>
    </PageSeo>
  )
}

export default withAuthentication(withVenueOwner(OrderPage))
