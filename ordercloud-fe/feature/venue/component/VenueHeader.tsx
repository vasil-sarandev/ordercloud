import Image from 'next/image'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import { getVenue } from '../ducks'
import styles from '../styles/venueHeader.module.css'
import { LayoutWrapper } from './LayoutWrapper'

interface Props {}

export const VenueHeader: FC<Props> = () => {
  const venue = useSelector(getVenue)
  return (
    <div className={styles.container}>
      <div className={styles.cover}>
        <Image src={venue.cover} width={1000} height={250} layout='responsive' />
      </div>
      <div className={styles.cover_desktop} style={{ backgroundImage: `url(${venue.cover})` }} />
      <div className={styles.logo}>
        <Image src={venue.logo} width={75} height={75} layout='fixed' />
      </div>
      <LayoutWrapper includePadding={false}>
        <div className={styles.venueTitle}>{venue.name}</div>
        {venue.announcement && <div className={styles.announcement}>{venue.announcement}</div>}
      </LayoutWrapper>
    </div>
  )
}
