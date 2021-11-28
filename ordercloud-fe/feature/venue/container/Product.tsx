import { FC, useState } from 'react'
import { pickBy } from 'lodash'
import { VenueProduct } from '../component'
import { Addition, Product } from '../../../shared'

interface Props {
  product: Product
  orderingEnabled: boolean
  addProduct: (product: Product, selectedAdditions?: Array<Addition>) => void
}

interface FormState {
  [key: string]: boolean
}

export const ProductContainer: FC<Props> = ({ product, orderingEnabled, addProduct }) => {
  const [additionsFormState, setAdditionFormState] = useState<FormState>({})
  const handleAdditionValueChange = (which: string, val: boolean) => {
    const newState: FormState = { ...additionsFormState, [which]: val }
    setAdditionFormState(newState)
  }

  const handleAddToCart = () => {
    const positiveAdditionsIds = Object.keys(pickBy(additionsFormState))
    const currentAdditions = product.additions.filter((x) => positiveAdditionsIds.includes(x.id))
    addProduct(product, currentAdditions)
    setAdditionFormState({})
  }

  return (
    <VenueProduct
      orderingEnabled={orderingEnabled}
      product={product}
      handleAddToCart={handleAddToCart}
      formValues={additionsFormState}
      handleAdditionChange={handleAdditionValueChange}
    />
  )
}
