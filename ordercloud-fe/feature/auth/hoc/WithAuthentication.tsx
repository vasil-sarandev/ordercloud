import { useAuth0 } from '@auth0/auth0-react'
import { useRouter } from 'next/router'
import { ComponentType, FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { PageLoader } from '../../../shared/components/PageLoader'
import { STATIC_ROUTES } from '../../../shared'
import { getAppAccessToken, getAppIsAccessTokenLoading, useApp } from '../../state/app_ducks'

interface Props {}

export const withAuthentication = (Component: ComponentType): FC<Props> => (props) => {
  const router = useRouter()
  const { setAccessToken } = useApp()
  const accessToken = useSelector(getAppAccessToken)
  const isAccessTokenLoading = useSelector(getAppIsAccessTokenLoading)
  const { isAuthenticated, isLoading: isAuthLoading, getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    if (isAuthLoading === false || !accessToken) {
      setAccessToken(getAccessTokenSilently)
    }
  }, [isAuthLoading])

  const isLoading = isAccessTokenLoading || isAuthLoading

  const shouldRenderComponent = isAuthenticated && accessToken

  if (isLoading) return <PageLoader />
  if (!shouldRenderComponent) {
    router.push(STATIC_ROUTES.homepage.as)
  }
  if (shouldRenderComponent) return <Component {...props} />

  return <PageLoader />
}
