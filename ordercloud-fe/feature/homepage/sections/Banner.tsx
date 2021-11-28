import {
  BulbFilled,
  CalendarFilled,
  CopyFilled,
  PlusCircleFilled,
  StarFilled
} from '@ant-design/icons'
import { FC } from 'react'
import styles from '../styles/banner.module.css'

interface Props {}

const FEATURES_LIST = [
  { title: 'Пълно персонализиране', icon: <StarFilled /> },
  { title: 'Неограничен брой посетители', icon: <BulbFilled /> },
  { title: 'Неограничен брой поръчки', icon: <PlusCircleFilled /> },
  { title: 'Неограничен брой продукти', icon: <CopyFilled /> },
  { title: 'Неограничен брой категории', icon: <CalendarFilled /> }
]

export const Banner: FC<Props> = () => {
  const features = FEATURES_LIST.map((x) => (
    <div className={styles.feature} key={x.title}>
      <div className={styles.icon}>{x.icon}</div>
      <div className={styles.title}>{x.title}</div>
    </div>
  ))
  return (
    <div className={styles.container}>
      <div className={styles.features}>{features}</div>
    </div>
  )
}
