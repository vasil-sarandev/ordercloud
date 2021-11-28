import { FC } from 'react'
import {
  BackButton,
  Button,
  Card,
  FetchResponseHandler,
  OrderingType,
  STATIC_ROUTES,
  toReadableDate,
  toReadablePrice
} from '../../../../shared'
import { DeliveryOrderLocationDetails, OnSiteOrderLocationDetails, ProductCard } from '../component'
import { useGetOrder, useCompleteOrder } from '../hook'
import styles from '../styles/viewOrder.module.css'

interface Props {
  id: string
}

export const ViewOrderContainer: FC<Props> = ({ id }) => {
  const { isLoading: isCompleteLoading, completeOrder } = useCompleteOrder(id)
  const { order, isLoading, error, refetchData } = useGetOrder(id)

  const orderType = order && order.details.orderType
  const addressDetails =
    orderType === OrderingType.DELIVERY ? (
      <DeliveryOrderLocationDetails order={order} />
    ) : (
      <OnSiteOrderLocationDetails order={order} />
    )

  const displayProducts =
    order && order.products.map((x) => <ProductCard key={x.product.name + x.price} product={x} />)

  const handleCompleteOrder = async () => {
    await completeOrder()
    refetchData()
  }

  return (
    <>
      <BackButton
        text='Обратно към поръчки'
        linkAs={STATIC_ROUTES.orders.as}
        linkHref={STATIC_ROUTES.orders.href}
      />
      <FetchResponseHandler loading={isLoading} error={error} showSkeleton>
        {order && (
          <div className={styles.container}>
            <div className={styles.info}>
              <Card>
                <>
                  <div>
                    <b>Получена</b> на {toReadableDate(order.createdAt)}
                  </div>
                  <div>
                    <b>Обща сума:</b> {toReadablePrice(order.totalPrice)}
                  </div>
                  <div>
                    <b>Коментар:</b>{' '}
                    {order.details.comment ? order.details.comment : 'Няма коментар'}
                  </div>
                  <div>
                    <b>Статус:</b> {order.complete ? 'Завършена' : 'Незавършена'}
                  </div>
                </>
              </Card>
            </div>
            <div className={styles.location}>{addressDetails}</div>
            {!order.complete && (
              <div className={styles.button}>
                <Button onClick={handleCompleteOrder} loading={isCompleteLoading} block>
                  Завърши поръчката.
                </Button>
              </div>
            )}
            <div className={styles.products}>
              <Card>
                <div className={styles.productsList}>{displayProducts}</div>
              </Card>
            </div>
          </div>
        )}
      </FetchResponseHandler>
    </>
  )
}
