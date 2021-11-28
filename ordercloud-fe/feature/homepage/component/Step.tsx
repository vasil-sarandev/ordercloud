import { FC } from 'react'
import styles from '../styles/step.module.css'

interface Props {
  title: string
  description: any
  index: string
}

export const Step: FC<Props> = ({ title, description, index }) => (
  <div className={styles.container}>
    <div className={styles.header}>
      <div className={styles.title}>{title}</div>
      <div className={`${styles.digits} bolder`}>{index}</div>
    </div>
    <div className={styles.description}>{description}</div>
  </div>
)
