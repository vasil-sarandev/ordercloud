import { Venue, VenueTheme } from '../../../venue'

export type PersonalizationFormState = {
  logo: Array<any>
  cover: Array<any>
  name: string
  slug: string
  announcement?: string
  enablePickUp: boolean
  enableOrders: boolean
  primaryColor: string
  secondaryColor: string
}

export const transformProfileResponse = (data: Venue): PersonalizationFormState => {
  const transformedLogo = [
    {
      uid: '0',
      name: 'image.png',
      status: 'done',
      url: data.logo
    }
  ]
  const transformedCover = [
    {
      uid: '0',
      name: 'image.png',
      status: 'done',
      url: data.cover
    }
  ]
  const { primary, secondary } = data.theme
  return {
    ...data,
    primaryColor: primary,
    secondaryColor: secondary,
    logo: transformedLogo,
    cover: transformedCover
  }
}
