import { VenueTheme } from '../model/Theme'

export const applyVenueTheme = (theme: VenueTheme): void => {
  const root: HTMLElement = document.querySelector(':root')
  const rootStyle = root.style
  rootStyle.setProperty('--primary', theme.primary)
  rootStyle.setProperty('--secondary', theme.secondary)
}
