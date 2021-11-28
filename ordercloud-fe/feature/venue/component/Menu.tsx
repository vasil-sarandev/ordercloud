import { FC } from 'react'
import { useSelector } from 'react-redux'
import { Venue } from '../model'
import { VenueCategory } from './Category'
import styles from '../styles/menu.module.css'
import { getOrderingEnabled, useCart } from '../ducks'

interface Props {
  venue: Venue
}

export const VenueMenu: FC<Props> = ({ venue }) => {
  const { addProduct } = useCart()
  const orderingEnabled = useSelector(getOrderingEnabled)
  const displayCategories = venue.categories.map((x) => (
    <VenueCategory
      category={x}
      key={x.id}
      addProduct={addProduct}
      orderingEnabled={orderingEnabled}
    />
  ))
  return <div className={styles.wrapper}>{displayCategories}</div>
}
