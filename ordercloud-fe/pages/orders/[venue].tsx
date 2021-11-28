import { FC, useEffect } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/dist/client/router'
import queryString from 'query-string'
import { RootState } from '../../feature/state'
import {
  VenueContainer,
  useVenue,
  getStaticPathsVenuePages,
  getStaticPropsVenuePages
} from '../../feature/venue'
import { OrderingType, PageLoader } from '../../shared'

interface Props {
  initialReduxState: RootState
}

const VenuePageWithOrders: FC<Props> = ({ initialReduxState }) => {
  const router = useRouter()
  if (router.isFallback) return <PageLoader />
  const { setOnSiteLocation, setOrderingType, setOrderingEnabled } = useVenue()
  useEffect(() => {
    // check if we have a site location param for page. if we do -
    // change the ordering type and set the site location.
    const {
      query: { site }
    } = queryString.parseUrl(router.asPath)
    if (site) {
      setOnSiteLocation(site as string)
    } else {
      setOrderingType(OrderingType.DELIVERY)
    }
    setOrderingEnabled(initialReduxState.venue.venue.enableOrders)
  }, [])

  return <VenueContainer />
}

export const getStaticProps: GetStaticProps = getStaticPropsVenuePages
export const getStaticPaths: GetStaticPaths = getStaticPathsVenuePages

export default VenuePageWithOrders
