import { FC, ReactChild } from 'react'
import Div100vh from 'react-div-100vh'
import { motion } from 'framer-motion'
import { LayoutFooter } from './Footer'
import { LayoutHeader } from './Header'
import styles from '../styles/container.module.css'

interface Props {
  hasHeader?: boolean
  hasFooter?: boolean
  restrictWidth?: boolean
  title?: string
  children: ReactChild | ReactChild[]
  action?: ReactChild | ReactChild[]
}

export const LayoutContainer: FC<Props> = ({
  hasHeader = true,
  hasFooter = true,
  restrictWidth = true,
  title,
  action,
  children
}) => {
  const layoutClass = `${styles.layoutContainer} ${restrictWidth ? styles.restrict : ' '}`
  return (
    <Div100vh style={{ minHeight: '100rvh' }}>
      <div className={layoutClass}>
        {hasHeader && <LayoutHeader />}

        <motion.div
          className={styles.motionDiv}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <main className={styles.layoutMain}>
            <div className={styles.contentHeader}>
              <div className={styles.pageTitle}>{title}</div>
              <div className={styles.action}>{action}</div>
            </div>
            {children}
          </main>
        </motion.div>
        {hasFooter && <LayoutFooter />}
      </div>
    </Div100vh>
  )
}
