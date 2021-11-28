import { FC } from 'react'
import styles from '../styles/productPrice.module.css'

interface Props {
  price: number
}

export const ProductPrice: FC<Props> = ({ price }) => {
  const fullPrice = price.toFixed(2)
  const values = fullPrice.toString().split('.')
  const majorValue = values[0]
  const minorValue = values[1]

  return (
    <div className={styles.wrapper}>
      <div className={styles.major}>{majorValue}</div>
      <div className={styles.rightPart}>
        <div className={styles.minor}>{minorValue}</div>
        <div className={styles.currency}>лв.</div>
      </div>
    </div>
  )
}
