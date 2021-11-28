import { useAuth0 } from '@auth0/auth0-react'
import { FC, useState } from 'react'
import { BurgerIcon, CustomLink, STATIC_ROUTES } from '../../../../shared'
import styles from '../styles/headerNavigation.module.css'

const NAV_LINKS: Array<{
  as: string
  href: string
  label: string
}> = [
  { as: STATIC_ROUTES.dashboard.as, href: STATIC_ROUTES.dashboard.href, label: 'Home' },
  { as: STATIC_ROUTES.categories.as, href: STATIC_ROUTES.categories.href, label: 'Категории' },
  { as: STATIC_ROUTES.products.as, href: STATIC_ROUTES.products.href, label: 'Продукти' },
  { as: STATIC_ROUTES.orders.as, href: STATIC_ROUTES.orders.href, label: 'Поръчки' },
  {
    as: STATIC_ROUTES.personalization.as,
    href: STATIC_ROUTES.personalization.href,
    label: 'Персонализация'
  }
]

interface Props {}

interface MobileLinksProps {
  visible: boolean
}

const MobileLinks: FC<MobileLinksProps> = ({ visible }) => {
  const { logout } = useAuth0()
  const containerClass = `${styles['mobile-container']} ${visible ? styles.isActive : ' '}`
  const links = NAV_LINKS.map((link) => (
    <CustomLink as={link.as} href={link.href} key={link.label}>
      <div className={styles['mobile-nav-link']}>{link.label}</div>
    </CustomLink>
  ))
  return (
    <div className={styles['outer-container-mobile']}>
      <div className={containerClass}>
        {links}
        <div
          onClick={() => {
            logout({ returnTo: process.env.baseurl_app })
          }}
        >
          <CustomLink as='#' href='#'>
            <div className={styles['mobile-nav-link']}>Logout</div>
          </CustomLink>
        </div>
      </div>
    </div>
  )
}

export const MobileNavigation: FC<Props> = () => {
  const [visible, setVisible] = useState(false)
  const toggleVisible = () => {
    setVisible((prev) => !prev)
  }
  return (
    <>
      <div className={styles.mobile}>
        <div className={styles['burger-container']}>
          <BurgerIcon onClick={toggleVisible} isActive={visible} />
        </div>
        <div className={styles['nav-container-mobile']}>
          <MobileLinks visible={visible} />
        </div>
      </div>
    </>
  )
}
