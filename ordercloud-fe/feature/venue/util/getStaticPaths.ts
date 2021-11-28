import { GetStaticPaths } from 'next'
import { VenueService } from '../service'

export const getStaticPathsVenuePages: GetStaticPaths = async () => {
  const resp = await VenueService.getVenueNames()
  const paths = resp.data.map((venue) => ({ params: { venue } }))
  // we have fallback implemented in the static pages.
  return {
    paths,
    fallback: true
  }
}
