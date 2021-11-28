import { CategoryFormState } from '../ducks'

export const transformCategoryResponse = (data: any): CategoryFormState => {
  const transformedImage = [
    {
      uid: '0',
      name: 'image.png',
      status: 'done',
      url: data.image
    }
  ]
  return {
    ...data,
    image: transformedImage
  }
}
