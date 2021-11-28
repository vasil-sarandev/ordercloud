import { FC } from 'react'
import { CreateVenueContainer } from '../../feature/admin/create-venue'
import { withAuthentication } from '../../feature/auth'

interface Props {}

const CreateVenuePage: FC<Props> = () => <CreateVenueContainer />

export default withAuthentication(CreateVenuePage)
