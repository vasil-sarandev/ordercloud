/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */

import { FC, ReactChild, ReactChildren } from 'react'
import { Auth0Provider as Auth0ProviderContext } from '@auth0/auth0-react'

interface Props {
  children: ReactChild | ReactChildren
}

const auth0_domain = process.env.auth0_domain
const auth0_clientId = process.env.auth0_clientId
const auth0_redirectUri = process.env.auth0_redirectUri
const auth0_audience = process.env.auth0_audience
const auth0_scope = process.env.auth0_scope

export const Auth0Provider: FC<Props> = ({ children }) => (
  <Auth0ProviderContext
    domain={auth0_domain}
    clientId={auth0_clientId}
    redirectUri={auth0_redirectUri}
    audience={auth0_audience}
    scope={auth0_scope}
    cacheLocation='localstorage'
    useRefreshTokens
  >
    {children}
  </Auth0ProviderContext>
)
