import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const useRouterScroll = () => {
  const router = useRouter()
  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      window.scroll({
        top: 0,
        left: 0
      })
    })
  }, [])
}
