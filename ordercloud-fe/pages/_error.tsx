import Error from 'next/error'
import { ErrorPage } from '../shared'

const CustomErrorPage = ({ statusCode }) => {
  if (statusCode === 404) return <Error statusCode={404} />
  return <ErrorPage />
}

CustomErrorPage.getInitialProps = ({ res, err }) => {
  // eslint-disable-next-line no-nested-ternary
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default CustomErrorPage
