import { FC } from 'react'
import { Card, Order } from '../../../../shared'
import styles from '../styles/deliveryOrderLocation.module.css'

interface Props {
  order: Order
}

export const DeliveryOrderLocationDetails: FC<Props> = ({ order }) => (
  <Card>
    <div className={styles.container}>
      <div className={styles.infoRow}>
        <b>Адрес:</b> {order.details.address}
      </div>
      <div className={styles.infoRow}>
        <b>Клиент:</b> {order.details.name}, {order.details.phoneNumber}
      </div>
    </div>
  </Card>
)
