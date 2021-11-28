import { ProductFormState } from '../ducks'

export const transformProductResponse = (data: any): ProductFormState => {
  let transformedImage = []
  if (data.image)
    transformedImage = [
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
