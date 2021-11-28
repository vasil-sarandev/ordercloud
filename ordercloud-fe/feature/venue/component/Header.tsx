import { FC } from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import styles from '../styles/header.module.css'
import { CartIcon } from '../../../assets/icons/CartIcon'
import { getNumberOfProducts } from '../util/cartActions'
import { Badge } from '../../../shared'
import { getCart, getOrderingEnabled, useCart } from '../ducks'

interface HeaderHOCProps {}

interface Props extends HeaderHOCProps {
  orderingEnabled: boolean
  numberOfProducts: number
  setCartVisible: (visible: boolean) => void
}

const LOGO_URL = process.env.logo_url

const HeaderComponent: FC<Props> = ({ orderingEnabled, numberOfProducts, setCartVisible }) => (
  <div className={styles.container}>
    <div className={styles.inner}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Link as='/' href='/'>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a>
              <img src={LOGO_URL} alt='ordercloud logo' />
            </a>
          </Link>
        </div>
      </div>
      <div className={styles.right} style={{ marginRight: numberOfProducts > 9 ? '10px' : '0px' }}>
        {orderingEnabled && (
          <Badge count={numberOfProducts} props={{ size: 'small' }}>
            <div className={styles.cart} onClick={() => setCartVisible(true)}>
              <div className={styles.cartIcon}>
                <CartIcon />
              </div>
            </div>
          </Badge>
        )}
      </div>
    </div>
  </div>
)

const HeaderHOC: FC<HeaderHOCProps> = () => {
  const cart = useSelector(getCart)
  const orderingEnabled = useSelector(getOrderingEnabled)
  const numberOfProducts = getNumberOfProducts(cart)
  const { setCartVisible } = useCart()
  return (
    <HeaderComponent
      orderingEnabled={orderingEnabled}
      numberOfProducts={numberOfProducts}
      setCartVisible={setCartVisible}
    />
  )
}

export { HeaderHOC as Header }
