import { FC } from 'react'
import { Addition, OrderingType, Product, toReadablePrice } from '../../../shared'
import { CartProduct } from '../model'
import styles from '../styles/cart.module.css'
import { calculateTotalPrice } from '../util'
import { CartFooterDelivery } from './CartFooterDelivery'
import { CartFooterOnSite } from './CartFooterOnSite'
import { CartProductComponent } from './CartProduct'

interface Props {
  cart: Array<CartProduct>
  addProduct: (product: Product, selectedAdditions?: Array<Addition>) => void
  removeProduct: (product: Product, selectedAdditions?: Array<Addition>) => void
  displayCart: boolean
  orderingType: OrderingType
  setDisplayCart: (boolean) => void
}

export const Cart: FC<Props> = ({
  cart,
  addProduct,
  removeProduct,
  displayCart,
  orderingType,
  setDisplayCart
}) => {
  if (!cart.length) return <div className={styles.warning}>Количката ви е празна.</div>
  const productList = cart.map((cartProduct) => (
    <CartProductComponent
      key={cartProduct.product.id + cartProduct.additions.length}
      product={cartProduct}
      addProduct={addProduct}
      removeProduct={removeProduct}
    />
  ))
  return (
    <div className={styles.wrapper}>
      {displayCart && (
        <>
          <div className={styles.heading}>Количка</div>
          <div className={styles.products}>{productList}</div>
          <div className={styles.cartTotal}>
            Обща сума: {toReadablePrice(calculateTotalPrice(cart))}
          </div>
        </>
      )}
      <>
        {orderingType === OrderingType.ON_SITE && <CartFooterOnSite />}
        {orderingType === OrderingType.DELIVERY && (
          <CartFooterDelivery
            displayForm={!displayCart}
            setDisplayForm={(bool) => setDisplayCart(!bool)}
          />
        )}
      </>
    </div>
  )
}
