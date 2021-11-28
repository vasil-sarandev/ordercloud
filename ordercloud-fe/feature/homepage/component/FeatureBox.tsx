import { FC } from 'react'

import { CheckCircleOutlined } from '@ant-design/icons'
import styles from '../styles/featureBox.module.css'

interface Props {
  title: string
  description: string
  benefits: string[]
}

export const FeatureBox: FC<Props> = ({ title, description, benefits }) => {
  const displayBenefits = benefits.map((benefit) => (
    <div className={styles.benefit} key={benefit}>
      <div className={styles.icon}>
        <CheckCircleOutlined />
      </div>
      <div className={styles.text}>{benefit}</div>
    </div>
  ))
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={`${styles.title} bolder`}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>
      <div className={styles.bottom}>
        <h6>Features</h6>
        <div className={styles.benefits}>{displayBenefits}</div>
      </div>
    </div>
  )
}
