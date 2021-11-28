import { FC } from 'react'
import { Card, Order } from '../../../../shared'
import styles from '../styles/deliveryOrderLocation.module.css'

interface Props {
  order: Order
}

export const OnSiteOrderLocationDetails: FC<Props> = ({ order }) => (
  <Card>
    <div className={styles.container}>
      <div className={styles.infoRow}>
        <b>Локация:</b> {order.details.siteLocation}
      </div>
    </div>
  </Card>
)
