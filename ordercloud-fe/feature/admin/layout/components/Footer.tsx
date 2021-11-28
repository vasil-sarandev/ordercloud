import { FC } from 'react'
import { CustomLink, STATIC_ROUTES } from '../../../../shared'
import styles from '../styles/footer.module.css'

interface Props {}

export const LayoutFooter: FC<Props> = () => (
  <footer className={styles.container}>
    Powered by{' '}
    <CustomLink as={STATIC_ROUTES.homepage.as} href={STATIC_ROUTES.homepage.href}>
      <b>Ordercloud</b>
    </CustomLink>
  </footer>
)
