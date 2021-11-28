import { FC } from 'react'
import { CustomLink } from '../../../../shared'
import styles from '../styles/header.module.css'
import { HeaderNavigation } from './HeaderNavigation'

interface Props {}

export const LayoutHeader: FC<Props> = () => (
  <div className={styles.header}>
    <div className={styles['inner-header']}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <CustomLink as='/' href='/'>
            <img src={process.env.logo_url} alt='Logo' />
          </CustomLink>
        </div>
      </div>
      <div className={styles.right}>
        <HeaderNavigation />
      </div>
    </div>
  </div>
)
