import { FC, useEffect } from 'react'
import Div100vh from 'react-div-100vh'
import { useSelector } from 'react-redux'
import { ErrorType, FetchResponseHandler, PageSeo } from '../../../shared'
import { CategoryNavigation, VenueHeader, VenueMenu, Header, LayoutWrapper } from '../component'
import { VenueFooter } from '../component/Footer'
import { getFetchCategoriesError, getFetchCategoriesLoading, getVenue, useVenue } from '../ducks'
import { Venue } from '../model'
import styles from '../styles/container.module.css'
import { applyVenueTheme } from '../util/applyVenueTheme'
import { CartContainer } from './Cart'

interface Props {
  venue: Venue
  loading: boolean
  error: ErrorType
  hasCategories: boolean
  fetchCategories: () => void
}

const VenueContainer: FC<Props> = ({ venue, loading, error, fetchCategories, hasCategories }) => {
  useEffect(() => {
    // triggers fetch on venue categories / products.
    fetchCategories()
    // applys per-venue specified styles to root variables (primary, secondary)
    applyVenueTheme(venue.theme)
  }, [])

  const pageTitle = `${venue.name} меню | Ordercloud`
  const pageDescription = venue.announcement ? venue.announcement : 'Разгледайте менюто ни!'
  const pageImage = venue.cover

  return (
    <PageSeo title={pageTitle} description={pageDescription} image={pageImage}>
      <Div100vh style={{ minHeight: '100rvh', display: 'flex', flexDirection: 'column' }}>
        <div className={styles.container}>
          <Header />
          <VenueHeader />
          <LayoutWrapper includePadding={false}>
            <FetchResponseHandler
              loading={loading}
              error={error}
              isDataEmpty={!hasCategories}
              showSkeleton
              dataEmptyMessage='Обектът все още не е въвел менюто си.'
            >
              <CategoryNavigation venue={venue} />
              <div className={styles.contentWrapper}>
                <VenueMenu venue={venue} />
              </div>
            </FetchResponseHandler>
          </LayoutWrapper>
        </div>
        <div className={styles.cartContainer}>
          <CartContainer />
        </div>
        <VenueFooter />
      </Div100vh>
    </PageSeo>
  )
}

const VenueContainerHOC: FC = () => {
  const venue = useSelector(getVenue)
  const hasCategories = venue.categories.length !== 0
  const loading = useSelector(getFetchCategoriesLoading)
  const error = useSelector(getFetchCategoriesError)
  const { fetchCategories } = useVenue()
  return (
    <VenueContainer
      venue={venue}
      loading={loading}
      error={error}
      hasCategories={hasCategories}
      fetchCategories={fetchCategories}
    />
  )
}

export { VenueContainerHOC as VenueContainer }
