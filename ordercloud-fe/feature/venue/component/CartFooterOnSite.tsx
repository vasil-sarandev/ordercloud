import { FC } from 'react'
import { useSelector } from 'react-redux'
import { Button, TextArea } from '../../../shared'
import { getCartFormState, getCreateOrderLoading, useCart } from '../ducks'
import styles from '../styles/cartFooterOnSite.module.css'

interface Props {}

export const CartFooterOnSite: FC<Props> = () => {
  const formValues = useSelector(getCartFormState)
  const createOrderLoading = useSelector(getCreateOrderLoading)
  const { setFormField, createOrder } = useCart()

  return (
    <div className={styles.wrapper}>
      <TextArea
        name='comment'
        onChange={setFormField}
        value={formValues.comment}
        placeholder='Коментари към поръчката'
      />
      <div className={styles.btn}>
        <Button onClick={createOrder} block loading={createOrderLoading}>
          Поръчай
        </Button>
      </div>
    </div>
  )
}
