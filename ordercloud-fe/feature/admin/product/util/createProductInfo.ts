import { ProductFormState } from '../ducks'

export const createProductInfo = (data: ProductFormState): FormData => {
  const formData = new FormData()
  formData.append('name', data.name)
  formData.append('price', data.price.toString())
  formData.append('quantity', data.quantity)
  formData.append('category', data.category.value)
  if (data.details) formData.append('details', data.details)
  if (data.additions.length) {
    formData.append('additions', JSON.stringify(data.additions))
  } else {
    formData.append('additions', JSON.stringify([]))
  }
  if (data.image.length) {
    if (data.image[0].url) {
      formData.append('image', data.image[0].url)
    } else {
      formData.append('image', data.image[0])
    }
  } else {
    formData.append('image', JSON.stringify([]))
  }
  return formData
}
