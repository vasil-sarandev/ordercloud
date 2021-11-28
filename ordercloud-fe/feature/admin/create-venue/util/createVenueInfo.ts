import { CreateVenueFormState } from '../ducks'

export const createVenueInfo = (data: CreateVenueFormState): FormData => {
  const formData = new FormData()
  formData.append('logo', data.logo[0])
  formData.append('cover', data.cover[0])
  formData.append('name', data.name)
  formData.append('slug', data.slug.toLowerCase())
  formData.append(
    'theme',
    JSON.stringify({ primary: data.primaryColor, secondary: data.secondaryColor })
  )
  formData.append('enableOrders', JSON.stringify(data.enableOrders))
  if (data.announcement) formData.append('announcement', data.announcement)

  return formData
}
