import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { Auth0Provider } from '../feature/auth'
import { useStore } from '../feature/state'
import { useRouterScroll } from '../shared'
import { useAxiosInterceptors } from '../shared/util'
import '../shared/util/global.css'

useAxiosInterceptors()

const App = ({ Component, pageProps }: AppProps) => {
  useRouterScroll()
  return (
    <Provider store={useStore(pageProps.initialReduxState)}>
      <Auth0Provider>
        <Component {...pageProps} />
      </Auth0Provider>
    </Provider>
  )
}

export default App
