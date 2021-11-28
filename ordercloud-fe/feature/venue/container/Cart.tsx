import { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { Addition, Drawer, OrderingType, Product } from '../../../shared'
import { Cart } from '../component'
import { CartProduct } from '../model'
import { getCart, getCartVisible, getOrderingType, useCart } from '../ducks'

interface CartHocProps {}
interface Props extends CartHocProps {
  visible: boolean
  setVisible: (visible: boolean) => void
  cart: Array<CartProduct>
  orderingType: OrderingType
  addProduct: (product: Product, selectedAdditions?: Array<Addition>) => void
  removeProduct: (product: Product, selectedAdditions?: Array<Addition>) => void
}

const CartComponent: FC<Props> = ({
  cart,
  orderingType,
  visible,
  setVisible,
  addProduct,
  removeProduct
}) => {
  const [displayCart, setDisplayCart] = useState<boolean>(true)
  return (
    <Drawer
      visible={visible}
      onClose={() => {
        setVisible(false)
      }}
      // eslint-disable-next-line react/jsx-boolean-value
      closable={true}
      width={500}
    >
      <Cart
        cart={cart}
        addProduct={addProduct}
        removeProduct={removeProduct}
        displayCart={displayCart}
        orderingType={orderingType}
        setDisplayCart={setDisplayCart}
      />
    </Drawer>
  )
}

const CartHOC: FC<CartHocProps> = () => {
  const orderingType = useSelector(getOrderingType)
  const cart = useSelector(getCart)
  const visible = useSelector(getCartVisible)
  const { addProduct, removeProduct, setCartVisible } = useCart()
  return (
    <CartComponent
      cart={cart}
      orderingType={orderingType}
      visible={visible}
      setVisible={setCartVisible}
      addProduct={addProduct}
      removeProduct={removeProduct}
    />
  )
}

export { CartHOC as CartContainer }
