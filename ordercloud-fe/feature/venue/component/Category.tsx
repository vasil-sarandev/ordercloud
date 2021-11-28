import { FC, useEffect } from 'react'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import styles from '../styles/category.module.css'
import { CATEGORY_WRAPPER_CLASSNAME } from '../util'
import { ProductContainer } from '../container'
import { useVenue } from '../ducks'
import { Addition, Category, Product } from '../../../shared'

interface Props {
  category: Category
  orderingEnabled: boolean
  addProduct: (product: Product, selectedAdditions?: Array<Addition>) => void
}

export const VenueCategory: FC<Props> = ({ category, addProduct, orderingEnabled }) => {
  // whenever the category title enters viewport, trigger change category so category navigation scrolls to correct card.
  const { setCurrentCategory } = useVenue()
  const { ref, inView } = useInView({
    threshold: 1
  })
  useEffect(() => {
    if (inView) setCurrentCategory(category.title)
  }, [inView])

  const products = category.products.map((product) => (
    <ProductContainer
      product={product}
      key={product.id}
      addProduct={addProduct}
      orderingEnabled={orderingEnabled}
    />
  ))

  // if (!category.products.length) return null

  return (
    <div
      className={[styles.wrapper, CATEGORY_WRAPPER_CLASSNAME].join(' ')}
      data-category-title={category.title}
    >
      {category.image && (
        <div className={styles.categoryImg}>
          <Image src={category.image} layout='responsive' height='200px' width='600px' />
        </div>
      )}
      <div className={styles.header} data-category-title={category.title} ref={ref}>
        {category.title}
      </div>
      <div className={styles.productsWrapper}>{products}</div>
    </div>
  )
}
