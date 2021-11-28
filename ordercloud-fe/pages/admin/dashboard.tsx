import { FC } from 'react'
import { DashboardContainer } from '../../feature/admin/dashboard'
import { LayoutContainer } from '../../feature/admin/layout'
import { withAuthentication, withVenueOwner } from '../../feature/auth'
import { PageSeo } from '../../shared'

interface Props {}

const Dashboard: FC<Props> = () => (
  <PageSeo title='Админ | Ordercloud'>
    <LayoutContainer>
      <DashboardContainer />
    </LayoutContainer>
  </PageSeo>
)

export default withAuthentication(withVenueOwner(Dashboard))
