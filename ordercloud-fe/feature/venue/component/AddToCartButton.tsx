import { FC } from 'react'
import styles from '../styles/addToCartButton.module.css'
import { CartIcon } from '../../../assets/icons/CartIcon'

interface Props {
  onClick: () => void
}

export const AddToCartButton: FC<Props> = ({ onClick }) => (
  <div className={styles.wrapper} onClick={onClick}>
    <div className={styles.label}>Добави</div>
    <div className={styles.cartIcon}>
      <CartIcon />
    </div>
  </div>
)
