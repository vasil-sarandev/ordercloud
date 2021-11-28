import { FC } from 'react'
import { PersonalizationFormState } from '../util'
import styles from '../styles/form.module.css'
import { Checkbox, ColorPicker, ErrorMessage, Input, TextArea, Upload } from '../../../../shared'

interface Props {
  formState: PersonalizationFormState
  handleChange: (which: string, val: any) => void
  validationErrors: any
}

export const PersonalizationForm: FC<Props> = ({ formState, handleChange, validationErrors }) => (
  <div className={styles.container}>
    <Input
      label='Име на заведение'
      value={formState.name}
      placeholder='Пример: Starbucks - Paradise Mall'
      name='name'
      autoComplete='off'
      onChange={handleChange}
    />

    {validationErrors.name && (
      <div className={styles.inputError}>
        <ErrorMessage error={{ message: validationErrors.name }} />
      </div>
    )}

    <Input
      label='Идентификатор'
      value={formState.slug}
      name='slug'
      onChange={handleChange}
      autoComplete='off'
      placeholder='Пример: starbucks-paradise'
      disabled
    />

    {validationErrors.slug && (
      <div className={styles.inputError}>
        <ErrorMessage error={{ message: validationErrors.slug }} />
      </div>
    )}

    <ColorPicker
      label='Основен цвят'
      value={formState.primaryColor}
      onChange={handleChange}
      name='primaryColor'
    />
    <ColorPicker
      label='Вторичен цвят'
      value={formState.secondaryColor}
      onChange={handleChange}
      name='secondaryColor'
    />
    <div className={styles.inputHelp}>
      Основен цвят е цветът за бутони и заглавия в менюто ви, а вторичният е за акценти.
    </div>

    <Checkbox name='enableOrders' value={formState.enableOrders} onChange={handleChange}>
      Позволи поръчки
    </Checkbox>

    <div className={styles.inputHelp}>
      Ако ще ползвате платформата само за дигитално меню - без да приемате поръчки (доставки или
      поръчки от маса), оставете този бутон неактивен. Може да се промени по всяко време.
    </div>

    <TextArea
      label='Съобщение'
      value={formState.announcement}
      placeholder='Пример: Вече предлагаме бургерите ни и с веган месо от Impossible Foods'
      name='announcement'
      onChange={handleChange}
    />
    <div className={styles.inputHelp}>
      Съобщението, което ще виждат клиентите като достъпят менюто ви.
    </div>

    <Upload
      name='logo'
      onChange={handleChange}
      value={formState.logo}
      aspect={1 / 1}
      label='Profile picture'
    />

    <Upload
      name='cover'
      onChange={handleChange}
      value={formState.cover}
      aspect={4 / 1}
      label='Cover Image'
    />
  </div>
)
