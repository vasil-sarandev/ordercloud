import { CATEGORY_WRAPPER_CLASSNAME } from './variableNames'

export const scrollToCategoryInMenu = (categoryTitle: string): void => {
  const categoriesEls = document.getElementsByClassName(CATEGORY_WRAPPER_CLASSNAME)
  const categories = Array.from(categoriesEls)
  const currentCategoryInMenu: HTMLElement = categories.find(
    (x: HTMLElement) => x.dataset.categoryTitle === categoryTitle
  ) as HTMLElement
  // sticky category header height is 50. header is 55 so together = 105
  const scrollTo = currentCategoryInMenu.offsetTop - 100
  window.scrollTo({
    top: scrollTo
    // this is commented out because it causes issues with the other scroll handler.
    // behavior: 'smooth'
  })
}
