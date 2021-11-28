import { FC } from 'react'
import { CustomLink, STATIC_ROUTES as routes } from '../../../shared'
import styles from '../styles/footer.module.css'

interface Props {}

const FOOTER_LINKS = [
  { as: routes.homepage.as, href: routes.homepage.href, label: 'Регистрация на заведение' },
  { as: routes.termsOfUse.as, href: routes.termsOfUse.href, label: 'Условия за ползване' }
]

export const VenueFooter: FC<Props> = () => {
  const links = FOOTER_LINKS.map((x) => (
    <div className={styles.link} key={x.label}>
      <CustomLink as={x.as} href={x.href}>
        {x.label}
      </CustomLink>
    </div>
  ))
  return (
    <div className={styles.container}>
      <div className={styles.credits}>
        Powered by
        <CustomLink as={routes.homepage.as} href={routes.homepage.href}>
          <b>Ordercloud</b>
        </CustomLink>
      </div>
      <div className={styles.links}>{links}</div>
    </div>
  )
}
