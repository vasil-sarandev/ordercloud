import { FC } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { RootState } from '../feature/state'
import {
  VenueContainer,
  getStaticPathsVenuePages,
  getStaticPropsVenuePages
} from '../feature/venue'
import { PageLoader } from '../shared'

interface Props {
  initialReduxState: RootState
}

const VenuePage: FC<Props> = () => {
  const router = useRouter()
  if (router.isFallback) return <PageLoader />
  return <VenueContainer />
}

export const getStaticProps: GetStaticProps = getStaticPropsVenuePages
export const getStaticPaths: GetStaticPaths = getStaticPathsVenuePages

export default VenuePage
