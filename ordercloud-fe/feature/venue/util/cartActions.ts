import { isEqual } from 'lodash'
import { Addition, Product } from '../../../shared'
import { CartProduct } from '../model'

export const getNumberOfProducts = (cart: Array<CartProduct>): number => {
  const productCount = cart.reduce(
    (totalCount, currentProduct) => totalCount + currentProduct.quantity,
    0
  )
  return productCount
}

export const addProductToCart = (
  product: Product,
  selectedAdditions: Array<Addition>,
  cart: Array<CartProduct>
): Array<CartProduct> => {
  // no mutating state directly.
  const cartCopy = [...cart]
  const matchProduct = cartCopy.find(
    (x) => x.product.id === product.id && isEqual(x.additions, selectedAdditions)
  )
  if (matchProduct) {
    matchProduct.quantity += 1
    return cartCopy
  }
  const additionsPrice = selectedAdditions.reduce(
    (price, currentAddition) => price + currentAddition.price,
    0
  )
  cartCopy.push({
    product,
    quantity: 1,
    additions: selectedAdditions,
    price: product.price + additionsPrice
  })
  return cartCopy
}

export const decreaseProductQuantity = (
  product: Product,
  additions: Array<Addition>,
  cart: Array<CartProduct>
): Array<CartProduct> => {
  // no mutating state directly.
  const cartCopy = [...cart]
  const matchProduct = cartCopy.find(
    (x) => x.product.id === product.id && isEqual(x.additions, additions)
  )
  if (matchProduct.quantity === 1) {
    return cartCopy.filter((x) => !isEqual(x, matchProduct))
  }
  matchProduct.quantity -= 1
  return cartCopy
}

export const calculateTotalPrice = (cart: Array<CartProduct>): number => {
  const totalSum = cart.reduce(
    (totalPrice, currentProduct) => totalPrice + currentProduct.quantity * currentProduct.price,
    0
  )
  return totalSum
}
