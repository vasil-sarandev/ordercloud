import { FC } from 'react'
import { useSelector } from 'react-redux'
import { isEmpty } from 'lodash'
import styles from '../styles/form.module.css'
import { getCategoryFormState, useCategory } from '../ducks'
import { Input, Upload, Button } from '../../../../shared'

interface Props {
  buttonLabel: string
  handleSubmit: () => void
  isLoading: boolean
}

export const CategoryForm: FC<Props> = ({ buttonLabel, handleSubmit, isLoading }) => {
  const formState = useSelector(getCategoryFormState)
  const { setFormField } = useCategory()
  const disableButton = isEmpty(formState.title)
  return (
    <div className={styles.form}>
      <Input label='Име' name='title' value={formState.title} onChange={setFormField} />
      <Upload
        label='Изображение'
        name='image'
        value={formState.image}
        onChange={setFormField}
        aspect={3 / 1}
      />
      <div className={styles.submit}>
        <Button onClick={handleSubmit} disabled={disableButton} loading={isLoading} block>
          {buttonLabel}
        </Button>
      </div>
    </div>
  )
}
