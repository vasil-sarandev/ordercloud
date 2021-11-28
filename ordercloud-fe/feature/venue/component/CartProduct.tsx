import { FC } from 'react'
import { MinusCircleFilled, PlusCircleFilled } from '@ant-design/icons'
import { CartProduct } from '../model'
import styles from '../styles/cart.module.css'
import { Addition, Product, toReadablePrice } from '../../../shared'

interface Props {
  product: CartProduct
  addProduct: (product: Product, selectedAdditions?: Array<Addition>) => void
  removeProduct: (product: Product, selectedAdditions?: Array<Addition>) => void
}

interface CartProductAdditionProps {
  addition: Addition
}

const CartProductAddition: FC<CartProductAdditionProps> = ({ addition }) => (
  <div className={styles.additionWrapper}>
    {addition.name}, {toReadablePrice(addition.price)}
  </div>
)

export const CartProductComponent: FC<Props> = ({ product, addProduct, removeProduct }) => {
  const handleAdd = () => {
    addProduct(product.product, product.additions)
  }
  const handleRemove = () => {
    removeProduct(product.product, product.additions)
  }
  const additions = product.additions.map((x) => <CartProductAddition addition={x} key={x.id} />)
  return (
    <div className={styles.productWrapper}>
      <div className={styles.productInner}>
        <div className={styles.productLeft}>
          <div className={styles.productName}>{product.product.name}</div>
          <div className={styles.quantity}>
            <MinusCircleFilled onClick={handleRemove} />
            <div className={styles.productQuantity}>{product.quantity}</div>
            <PlusCircleFilled onClick={handleAdd} />
          </div>
          <div className={styles.productBottom}>
            <div className={styles.additions}>{additions}</div>
            <div className={styles.total}>
              Общо: {toReadablePrice(product.quantity * product.price)}
            </div>
          </div>
        </div>
        <div className={styles.productRight}>
          <div className={styles.productPrice}>{toReadablePrice(product.product.price)}</div>
          <div className={styles.productImage}>
            <img src={product.product.image} alt='product' />
          </div>
        </div>
      </div>
    </div>
  )
}
