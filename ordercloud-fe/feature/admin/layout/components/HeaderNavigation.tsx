import { FC } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import styles from '../styles/headerNavigation.module.css'
import { CustomLink, Dropdown, STATIC_ROUTES } from '../../../../shared'
import { MobileNavigation } from './MobileNavigation'

interface Props {}
interface NavLink {
  as: string
  href: string
  label: string
}

export const HeaderNavigation: FC<Props> = () => {
  const { user, logout } = useAuth0()
  const NAV_LINKS: Array<NavLink> = [
    { as: STATIC_ROUTES.dashboard.as, href: STATIC_ROUTES.dashboard.href, label: 'Home' },
    { as: STATIC_ROUTES.categories.as, href: STATIC_ROUTES.categories.href, label: 'Категории' },
    { as: STATIC_ROUTES.products.as, href: STATIC_ROUTES.products.href, label: 'Продукти' },
    { as: STATIC_ROUTES.orders.as, href: STATIC_ROUTES.orders.href, label: 'Поръчки' }
  ]
  const displayLinks = NAV_LINKS.map((link) => (
    <CustomLink as={link.as} href={link.href} key={link.label}>
      {link.label}
    </CustomLink>
  ))
  const dropdownOverlay = (
    <div className={styles.dropdownContainer}>
      <div>
        <CustomLink as={STATIC_ROUTES.personalization.as} href={STATIC_ROUTES.personalization.href}>
          Персонализация
        </CustomLink>
      </div>
      <div
        onClick={() => {
          logout({ returnTo: process.env.baseurl_app })
        }}
      >
        <CustomLink as='#' href='#'>
          Logout
        </CustomLink>
      </div>
    </div>
  )
  return (
    <>
      <div className={styles['nav-container']}>
        <div className={styles['nav-left']}>{displayLinks}</div>
        <div className={styles['nav-right']}>
          <Dropdown overlay={dropdownOverlay} placement='bottomRight'>
            <div className={styles.profileIcon}>
              <img src={user.picture} alt='profile' />
            </div>
          </Dropdown>
        </div>
      </div>
      <div className={styles.mobile}>
        <MobileNavigation />
      </div>
    </>
  )
}
