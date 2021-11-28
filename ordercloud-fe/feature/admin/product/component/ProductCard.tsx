/* eslint-disable no-underscore-dangle */
import { DeleteFilled, DollarCircleFilled, EditOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import Image from 'next/image'
import { FC } from 'react'
import {
  CustomLink,
  getErrorMessage,
  notification,
  Product,
  STATIC_ROUTES,
  toReadablePrice
} from '../../../../shared'
import { ProductService } from '../service'
import styles from '../styles/productCard.module.css'

interface Props {
  product: Product
  refetchData: () => void
}

export const ProductCard: FC<Props> = ({ product, refetchData }) => {
  const productLink = STATIC_ROUTES.product.as.replace('[id]', product._id)
  const handleDeleteClick = () =>
    Modal.confirm({
      title: 'Сигурни ли сте, че искате да изтриете продукта?',
      content: 'Действието е необратимо.',
      onOk: async () => {
        try {
          await ProductService.deleteProduct(product._id)
          refetchData()
          return
        } catch (e) {
          notification.error(getErrorMessage(e))
        }
      }
    })

  return (
    <div className={styles.container}>
      <div className={styles.nameContainer}>
        <div className={styles.image}>
          <Image src={product.image} width={30} height={30} layout='fixed' />
        </div>
        <div className={styles.name}>
          <CustomLink as={productLink} href={STATIC_ROUTES.product.href}>
            {product.name}
          </CustomLink>
        </div>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.price}>
          <div className={styles.cardIcon}>
            <DollarCircleFilled />
          </div>
          <div className={styles.actualPrice}>{toReadablePrice(product.price)}</div>
        </div>
        <div className={styles.actions}>
          <div className={styles.edit}>
            <CustomLink as={productLink} href={STATIC_ROUTES.product.href}>
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
