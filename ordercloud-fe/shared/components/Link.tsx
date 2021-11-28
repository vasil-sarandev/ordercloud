/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, ReactChild, ReactChildren } from 'react'
import Link from 'next/link'
import { NextRouter, withRouter } from 'next/router'

interface Props {
  as: string
  href: string
  children: ReactChild | ReactChildren
  router: NextRouter
}

const CustomLinkComponent: FC<Props> = ({ as, href, children, router }) => {
  const isActive = router.asPath === as
  const linkClass = `link${isActive ? ' active-link' : ' '}`
  return (
    <>
      <div className={linkClass}>
        <Link as={as} href={href}>
          <a>{children}</a>
        </Link>
      </div>
      <style jsx>{`
        :global(.link.active-link a) {
          font-weight: bold !important;
        }
      `}</style>
    </>
  )
}

export const CustomLink = withRouter(CustomLinkComponent)
