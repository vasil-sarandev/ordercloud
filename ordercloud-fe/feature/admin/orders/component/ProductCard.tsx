import Image from 'next/image'
import { FC } from 'react'
import { toReadablePrice } from '../../../../shared'
import { CartProduct } from '../../../venue'
import styles from '../styles/productCard.module.css'

interface Props {
  product: CartProduct
}
const AdditionRow = ({ name, price }) => (
  <div className={styles.addition}>
    {name}, {toReadablePrice(price)}
  </div>
)
export const ProductCard: FC<Props> = ({ product }) => {
  const additions = product.additions.map((x) => (
    <AdditionRow key={x.name} name={x.name} price={x.price} />
  ))
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.image}>
          <Image src={product.product.image} height={30} width={30} />
        </div>
        <div className={styles.name}>
          {product.product.name}, {product.quantity}бр.
        </div>
      </div>
      <div className={styles.additions}>{additions}</div>
      <div className={styles.total}>Общо: {toReadablePrice(product.price)}</div>
    </div>
  )
}
