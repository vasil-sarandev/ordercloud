import { CATEGORY_CARD_CLASSNAME } from './variableNames'

export const scrollToActiveCategoryCard = (container: HTMLElement, categoryTitle: string): void => {
  const cards = Array.from(document.getElementsByClassName(CATEGORY_CARD_CLASSNAME))
  const currentActiveCard = cards.find(
    (x: HTMLElement) => x.dataset.categoryTitle === categoryTitle
  )
  const boundingRect = currentActiveCard.getBoundingClientRect()
  const additionalMargin = window.screen.availWidth > 768 ? 40 : 10
  const scrollTo = container.scrollLeft + boundingRect.left - additionalMargin
  container.scrollTo({
    left: scrollTo,
    behavior: 'smooth'
  })
}
