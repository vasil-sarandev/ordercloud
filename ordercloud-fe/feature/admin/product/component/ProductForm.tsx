import { FC } from 'react'
import { useSelector } from 'react-redux'
import { CloseCircleOutlined } from '@ant-design/icons'
import { isEmpty } from 'lodash'
import styles from '../styles/form.module.css'
import { Input, Upload, Button, TextArea, AsyncSelect } from '../../../../shared'
import { getProductFormState, useProduct } from '../ducks'
import { ProductService } from '../service'
import { formFieldKeys } from '../ducks/productActions'

interface Props {
  buttonLabel: string
  handleSubmit: () => void
  isLoading: boolean
}

export const ProductForm: FC<Props> = ({ buttonLabel, handleSubmit, isLoading }) => {
  const { setFormField, setAdditionFormField, removeAddition, addAddition } = useProduct()
  const formState = useSelector(getProductFormState)

  const { additions } = formState
  const lastAddition = additions[additions.length - 1]
  const disableAddAddition = lastAddition
    ? isEmpty(lastAddition.name) || !lastAddition.price
    : false

  const disableSubmit =
    !formState.price ||
    isEmpty(formState.quantity) ||
    isEmpty(formState.category) ||
    disableAddAddition

  const displayAdditions = additions.map((x, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <div className={styles.addition} key={index}>
      <div className={styles.additionInput}>
        <Input
          label='Име'
          name='name'
          value={x.name}
          onChange={(name, value) => {
            setAdditionFormField(name as formFieldKeys, value, index)
          }}
        />
      </div>
      <div className={styles.additionInput}>
        <Input
          label='Цена'
          type='number'
          name='price'
          value={x.price}
          onChange={(name, value) => {
            setAdditionFormField(name as formFieldKeys, value, index)
          }}
        />
      </div>
      <div className={styles.closeIcon}>
        <CloseCircleOutlined
          onClick={() => {
            removeAddition(index)
          }}
        />
      </div>
    </div>
  ))

  return (
    <div className={styles.form}>
      <div className={styles.innerForm}>
        <div className={styles.left}>
          <Input
            label='Име'
            name='name'
            autoComplete='off'
            value={formState.name}
            onChange={setFormField}
          />
          <Input
            type='number'
            label='Цена'
            autoComplete='off'
            name='price'
            value={formState.price}
            onChange={setFormField}
          />
          <Input
            label='Количество'
            placeholder='Пример: 250ml.'
            autoComplete='off'
            name='quantity'
            value={formState.quantity}
            onChange={setFormField}
          />
          <TextArea
            label='Детайли'
            placeholder='Пример: Поднася се с гарнитура картофки.'
            name='details'
            value={formState.details}
            onChange={setFormField}
          />
          <AsyncSelect
            label='Категория'
            name='category'
            value={formState.category}
            onChange={setFormField}
            loadOptions={async () => {
              const resp = await ProductService.getCategoryOptions()
              return resp.data
            }}
          />
        </div>
        <div className={styles.right}>
          <div className={styles.additions}>
            <div className={styles.additionsLabel}>Добавки</div>
            {displayAdditions}
            <Button type='dashed' onClick={addAddition} disabled={disableAddAddition} block>
              Добави още
            </Button>
          </div>
          <Upload
            label='Изображение'
            name='image'
            value={formState.image}
            onChange={setFormField}
            aspect={1 / 1}
          />
        </div>
      </div>
      <div className={styles.submit}>
        <Button onClick={handleSubmit} disabled={disableSubmit} loading={isLoading} block>
          {buttonLabel}
        </Button>
      </div>
    </div>
  )
}
