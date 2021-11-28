import { FC } from 'react'
import { HomepageContainer } from '../feature/homepage/container'
import { PageSeo } from '../shared'

interface Props {}

const Home: FC<Props> = () => (
  <PageSeo>
    <HomepageContainer />
  </PageSeo>
)

export default Home
