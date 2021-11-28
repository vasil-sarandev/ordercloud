import { LeftCircleOutlined } from '@ant-design/icons'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import { Button, Input, TextArea } from '../../../shared'
import { getCartFormState, getCreateOrderLoading, useCart } from '../ducks'
import styles from '../styles/cartFooterDelivery.module.css'

interface Props {
  displayForm: boolean
  setDisplayForm: (boolean) => void
}

const CartFooterForm: FC = () => {
  const formValues = useSelector(getCartFormState)
  const loading = useSelector(getCreateOrderLoading)
  const { setFormField, createOrder } = useCart()
  return (
    <div className={styles.form}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          createOrder()
        }}
        autoComplete='on'
      >
        <Input
          required
          title='Име и фамилия са задължителни.'
          name='name'
          label='Име и фамилия*'
          value={formValues.name}
          onChange={setFormField}
        />

        <Input
          required
          pattern='^(\+359|0)\s?8(\d{2}\s\d{3}\d{3}|[789]\d{7})$'
          title='Телефонният номер следва да е във валиден формат (0885929379 / +359885929379)'
          name='phoneNumber'
          label='Телефон*'
          value={formValues.phoneNumber}
          onChange={setFormField}
        />

        <TextArea
          required
          name='address'
          title='Адресът е задължителен'
          onChange={setFormField}
          label='Адрес*'
          value={formValues.address}
          placeholder='Адрес за доставка'
        />

        <TextArea
          title='Коментар'
          name='comment'
          label='Коментар'
          onChange={setFormField}
          value={formValues.comment}
          placeholder='Коментари към поръчката'
        />

        <div className={styles.submitBtn}>
          <Button onClick={() => {}} loading={loading} block htmlType='submit'>
            Поръчай
          </Button>
        </div>
      </form>
    </div>
  )
}

export const CartFooterDelivery: FC<Props> = ({ displayForm, setDisplayForm }) => (
  <div className={styles.wrapper}>
    {displayForm ? (
      <div className={styles.inner}>
        <div
          className={styles.goBack}
          onClick={() => {
            setDisplayForm(false)
          }}
        >
          <LeftCircleOutlined /> Oбратно към количката
        </div>
        <CartFooterForm />
      </div>
    ) : (
      <Button
        onClick={() => {
          setDisplayForm(true)
        }}
        block
      >
        Към детайли за поръчката
      </Button>
    )}
  </div>
)
