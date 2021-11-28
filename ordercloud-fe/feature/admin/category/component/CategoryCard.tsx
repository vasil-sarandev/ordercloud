/* eslint-disable no-underscore-dangle */
import { DeleteFilled, EditOutlined, SolutionOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import Image from 'next/image'
import { FC } from 'react'
import { Category, CustomLink, notification, STATIC_ROUTES } from '../../../../shared'
import { CategoryService } from '../service'
import styles from '../styles/categoryCard.module.css'

interface Props {
  category: Category
  refetchData: () => void
}

export const CategoryCard: FC<Props> = ({ category, refetchData }) => {
  const categoryLink = STATIC_ROUTES.category.as.replace('[id]', category._id)
  const handleDeleteClick = () =>
    Modal.confirm({
      title: 'Сигурни ли сте, че искате да изтриете категорията?',
      content: 'Действието също ще изтрие всички продукти от категорията и е необратимо.',
      onOk: async () => {
        try {
          await CategoryService.deleteCategory(category._id)
          refetchData()
          return
        } catch (e) {
          notification.error({ message: e.message })
        }
      }
    })

  return (
    <div className={styles.container}>
      <div className={styles.nameContainer}>
        <div className={styles.image}>
          {category.image && <Image src={category.image} width={90} height={30} layout='fixed' />}
        </div>
        <div className={styles.name}>
          <CustomLink as={categoryLink} href={STATIC_ROUTES.category.href}>
            {category.title}
          </CustomLink>
        </div>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.productCount}>
          <div className={styles.cardIcon}>
            <SolutionOutlined />
          </div>
          <div className={styles.actualCount}>{category.products.length} продукта</div>
        </div>
        <div className={styles.actions}>
          <div className={styles.edit}>
            <CustomLink as={categoryLink} href={STATIC_ROUTES.category.href}>
              <EditOutlined />
            </CustomLink>
          </div>
          <div className={styles.delete}>
            <DeleteFilled onClick={handleDeleteClick} />
          </div>
        </div>
      </div>
    </div>
  )
}
