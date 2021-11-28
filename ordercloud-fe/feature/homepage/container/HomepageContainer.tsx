import { FC } from 'react'
import { Banner, Header, HeroBanner, Footer, Features, HowItWorks } from '../sections'
import styles from '../styles/container.module.css'

interface Props {}

export const HomepageContainer: FC<Props> = () => (
  <div className={styles.container}>
    <Header />
    <HeroBanner />
    <Banner />
    <Features />
    <HowItWorks />
    <Footer />
  </div>
)
