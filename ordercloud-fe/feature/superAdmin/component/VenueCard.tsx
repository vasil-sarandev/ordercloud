/* eslint-disable no-underscore-dangle */
import { FC } from 'react'
import { Button, CustomLink, STATIC_ROUTES } from '../../../shared'
import { Venue } from '../../venue'
import styles from '../styles/venueCard.module.css'

interface Props {
  venue: Venue
}

export const VenueCard: FC<Props> = ({ venue }) => {
  const orderLink = STATIC_ROUTES.ordersPage.as.replace('[venue]', venue.slug)

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.name}>
          {venue.name}/{venue.slug}
        </div>
      </div>
      <div className={styles.right}>
        <CustomLink as={orderLink} href={STATIC_ROUTES.ordersPage.href}>
          <Button onClick={() => {}}>Разгледай</Button>
        </CustomLink>
      </div>
    </div>
  )
}
