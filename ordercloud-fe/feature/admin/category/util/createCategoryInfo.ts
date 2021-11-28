import { CategoryFormState } from '../ducks'

export const createCategoryInfo = (data: CategoryFormState): FormData => {
  const formData = new FormData()
  formData.append('title', data.title)
  if (data.image.length) {
    if (data.image[0].url) {
      // this is on update - we received url from backend.
      formData.append('image', data.image[0].url)
    } else {
      formData.append('image', data.image[0])
    }
  }
  return formData
}
