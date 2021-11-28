import { FC } from 'react'
import { LayoutContainer } from '../../feature/admin/layout'
import { withAuthentication } from '../../feature/auth'
import { SuperAdminContainer } from '../../feature/superAdmin'
import { PageSeo } from '../../shared'

interface Props {}

const SuperAdminPage: FC<Props> = () => (
  <PageSeo title='Super admin | Ordercloud'>
    <LayoutContainer title='Super Admin'>
      <SuperAdminContainer />
    </LayoutContainer>
  </PageSeo>
)

export default withAuthentication(SuperAdminPage)
