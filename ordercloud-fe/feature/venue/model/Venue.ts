import { Category } from '../../../shared'
import { VenueTheme } from './Theme'

export type Venue = {
  name: string
  id: string
  logo: string
  cover: string
  style?: string
  slug: string
  announcement?: string
  enablePickUp: boolean
  enableOrders: boolean
  categories: Array<Category>
  theme: VenueTheme
}
