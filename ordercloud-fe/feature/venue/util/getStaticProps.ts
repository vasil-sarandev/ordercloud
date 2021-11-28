import { GetStaticProps } from 'next'
import { initialStateVenue, VenueState } from '../ducks'
import { VenueService } from '../service'

export const getStaticPropsVenuePages: GetStaticProps = async (ctx) => {
  const {
    params: { venue }
  } = ctx
  try {
    const resp = await VenueService.getVenueInfo(venue as string)
    if (resp.data) {
      const initStateVenue: VenueState = {
        ...initialStateVenue,
        venue: resp.data
      }
      const initialReduxState = {
        venue: initStateVenue
      }
      return { props: { initialReduxState }, revalidate: 1 }
    }
    return {
      notFound: true
    }
  } catch (e) {
    return {
      notFound: true
    }
  }
}
