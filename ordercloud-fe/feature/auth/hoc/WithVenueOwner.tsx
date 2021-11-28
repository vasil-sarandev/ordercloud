import { useRouter } from 'next/router'
import { ComponentType, FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { PageLoader, STATIC_ROUTES } from '../../../shared'
import { getAppIsVenueOwner, getAppIsVenueOwnerLoading, useApp } from '../../state/app_ducks'

interface Props {}

export const withVenueOwner = (Component: ComponentType): FC<Props> => (props) => {
  const router = useRouter()
  const { checkIfVenueOwner } = useApp()
  const loading = useSelector(getAppIsVenueOwnerLoading)
  const isVenueOwner = useSelector(getAppIsVenueOwner)

  useEffect(() => {
    if (!isVenueOwner) checkIfVenueOwner()
  }, [])

  if (loading) return <PageLoader />
  if (isVenueOwner === false) {
    router.push(STATIC_ROUTES.createVenue.as)
  }
  if (isVenueOwner) return <Component {...props} />

  return <PageLoader />
}
