import { FC } from 'react'
import { FeatureBox } from '../component'
import styles from '../styles/features.module.css'

interface Props {}

const FEATURES_LIST = [
  {
    title: 'Пълна персонализация на облика на менюто ви.',
    desription: 'Нагласете облика на дигиталното ви меню спрямо брандовата ви идентичност.',
    benefits: [
      'Избор на цветова гама',
      'Качване на лого и cover снимка',
      'Показване на името на заведението и по избор описание.'
    ]
  },
  {
    title: 'Ползвайте както на вас ви е удобно!',
    desription:
      'Дигиталното ви меню може да се ползва по няколко начина едновременно. Получавате персонален за вашето заведение линк в профила си и за трите варианта.',
    benefits: [
      'Само като меню',
      'Меню с доставки за вкъщи',
      'Меню с поръчки на място (от маса, хотелска стая и т.н.)'
    ]
  },
  {
    title: 'Получавайте поръчки в реално време',
    desription:
      'Административният ви панел в реално време ще получава и поръчките за доставка и тези на място в заведението.',
    benefits: [
      'Поръчки с доставка за вкъщи в реално време',
      'Поръчки от локация в заведението в реално време'
    ]
  }
]

export const Features: FC<Props> = () => {
  const features = FEATURES_LIST.map((x) => (
    <FeatureBox title={x.title} description={x.desription} benefits={x.benefits} key={x.title} />
  ))

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h2>Какво предлага платформата?</h2>
      </div>
      <div className={styles.boxes}>{features}</div>
    </div>
  )
}
