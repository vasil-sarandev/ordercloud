import { useRouter } from 'next/router'
import { FC } from 'react'

interface Props {
  path: string
}

export const Redirect: FC<Props> = ({ path }) => {
  const router = useRouter()
  router.push(path)
  return null
}
