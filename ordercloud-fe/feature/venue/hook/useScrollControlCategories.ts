import { useEffect } from 'react'
import { scrollToActiveCategoryCard } from '../util'

export const useScrollControlCategories = (container: HTMLElement, categoryName: string) => {
  useEffect(() => {
    // eslint-disable-next-line no-param-reassign
    if (container && categoryName) scrollToActiveCategoryCard(container, categoryName)
  }, [categoryName])
}
