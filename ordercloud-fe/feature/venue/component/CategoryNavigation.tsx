import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import { FC, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { getCurrentCategory, useVenue } from '../ducks'
import { Venue } from '../model'
import styles from '../styles/categoryNavigation.module.css'
import {
  CATEGORY_CARD_CLASSNAME,
  scrollToActiveCategoryCard,
  scrollToCategoryInMenu
} from '../util'

interface CategoryCardProps {
  title: string
  isActive: boolean
  setCurrentCategory: (category: string) => void
}

interface Props {
  venue: Venue
}

const CategoryCard: FC<CategoryCardProps> = ({ title, isActive, setCurrentCategory }) => {
  const cardClassName: string = `${styles.categoryCard} ${CATEGORY_CARD_CLASSNAME} ${
    isActive && styles.activeCategoryCard
  }`
  const handleClick: () => void = () => {
    setCurrentCategory(title)
  }
  return (
    <div className={cardClassName} onClick={handleClick} data-category-title={title}>
      {title}
    </div>
  )
}

export const CategoryNavigation: FC<Props> = ({ venue }) => {
  const container = useRef(null)
  const currentCategory = useSelector(getCurrentCategory)
  const { setCurrentCategory } = useVenue()
  const { categories } = venue

  // scroll the container to the currently active card.
  useEffect(() => {
    scrollToActiveCategoryCard(container.current, currentCategory)
  }, [currentCategory])

  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category)
    scrollToCategoryInMenu(category)
  }

  // decide whether to display arrows in desktop
  const currentCategoryIndex = categories.map((x) => x.title).indexOf(currentCategory)
  const disableLeft = currentCategoryIndex === 0
  const disableRight = currentCategoryIndex === categories.length - 1
  const handleLeftArrowClick = () => {
    if (!disableLeft) {
      const targetCategory = categories[currentCategoryIndex - 1]
      handleCategoryChange(targetCategory.title)
    }
  }
  const handleRightArrowClick = () => {
    if (!disableRight) {
      const targetCategory = categories[currentCategoryIndex + 1]
      handleCategoryChange(targetCategory.title)
    }
  }

  const categoryNames = categories.map((x) => x.title)
  const listCategories = categoryNames.map((category) => (
    <CategoryCard
      key={category}
      title={category}
      isActive={currentCategory === category}
      setCurrentCategory={handleCategoryChange}
    />
  ))

  return (
    <div className={styles.wrapper}> 
      <div className={styles.leftIcon} onClick={handleLeftArrowClick}>
        <div className={disableLeft ? styles.disabledIcon : ''}>
          <CaretLeftOutlined />
        </div>
      </div>
      <div className={styles.categoryInner} ref={container}>
        {listCategories}
      </div>
      <div className={styles.rightIcon} onClick={handleRightArrowClick}>
        <div className={disableRight ? styles.disabledIcon : ''}>
          <CaretRightOutlined />
        </div>
      </div>
    </div>
  )
}
