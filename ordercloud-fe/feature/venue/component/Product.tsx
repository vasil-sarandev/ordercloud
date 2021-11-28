import { FC } from 'react'
import Image from 'next/image'
import styles from '../styles/product.module.css'
import { AddToCartButton } from './AddToCartButton'
import { ProductPrice } from './ProductPrice'
import { Addition, Checkbox, Product, toReadablePrice } from '../../../shared'

interface Props {
  product: Product
  orderingEnabled: boolean
  handleAddToCart: () => void
  formValues: {
    [key: string]: boolean
  }
  handleAdditionChange: (name: string, value: boolean) => void
}

interface AdditionListProps {
  additions: Array<Addition>
  handleAdditionChange: (name: string, value: boolean) => void
  formValues: {
    [key: string]: boolean
  }
}

const AdditionsList: FC<AdditionListProps> = ({ additions, handleAdditionChange, formValues }) => {
  const additionsEls = additions.map((addition) => (
    <div className={styles.addition} key={addition.id}>
      <div className={styles.additionLabel}>
        {addition.name}(+{toReadablePrice(addition.price)})
      </div>
      <Checkbox
        value={formValues[addition.id]}
        onChange={handleAdditionChange}
        name={addition.id}
      />
    </div>
  ))
  return <>{additionsEls}</>
}

export const VenueProduct: FC<Props> = ({
  product,
  orderingEnabled,
  handleAddToCart,
  formValues,
  handleAdditionChange
}) => {
  const hasAdditions = product.additions.length > 0
  return (
    <div className={styles.productWrapper}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <div className={styles.productImage}>
            <Image src={product.image} layout='responsive' height='300px' width='300px' />
          </div>
          <div className={styles.productPrice}>
            <ProductPrice price={product.price} />
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.top}>
            <div className={styles.quantity}>{product.quantity}</div>
            <div className={styles.title}>
              <h3>{product.name}</h3>
            </div>
            <div className={styles.description}>{product.details}</div>
          </div>
          {!hasAdditions && orderingEnabled && (
            <div className={styles.cartBtn}>
              <AddToCartButton onClick={handleAddToCart} />
            </div>
          )}
        </div>
      </div>
      {hasAdditions && (
        <div className={styles.bottom}>
          <div className={styles.additions}>
            <AdditionsList
              handleAdditionChange={handleAdditionChange}
              formValues={formValues}
              additions={product.additions}
            />
          </div>
          {orderingEnabled && (
            <div className={styles.cartBtn}>
              <AddToCartButton onClick={handleAddToCart} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
