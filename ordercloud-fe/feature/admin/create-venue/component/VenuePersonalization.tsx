import { isEmpty } from 'lodash'
import { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Checkbox, ColorPicker, TextArea, Upload } from '../../../../shared'
import { getCreateVenueFormState, useCreateVenue } from '../ducks'
import styles from '../styles/main.module.css'

interface Props {
  setNextDisabled: (boolean) => void
}

export const VenuePersonalization: FC<Props> = ({ setNextDisabled }) => {
  const formState = useSelector(getCreateVenueFormState)
  const { setFormField } = useCreateVenue()
  useEffect(() => {
    const enableNext = !isEmpty(formState.logo) && !isEmpty(formState.cover)
    setNextDisabled(!enableNext)
  }, [formState])
  return (
    <div className={styles.personalizationWrapper}>
      <ColorPicker
        label='Основен цвят'
        value={formState.primaryColor}
        onChange={setFormField}
        name='primaryColor'
      />
      <ColorPicker
        label='Вторичен цвят'
        value={formState.secondaryColor}
        onChange={setFormField}
        name='secondaryColor'
      />
      <div className={styles.inputHelp}>
        Основен цвят е цветът за бутони и заглавия в менюто ви, а вторичният е за акценти.
      </div>

      <Checkbox name='enableOrders' value={formState.enableOrders} onChange={setFormField}>
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
        onChange={setFormField}
      />
      <div className={styles.inputHelp}>
        Съобщението, което ще виждат клиентите като достъпят менюто ви.
      </div>

      <Upload
        name='logo'
        onChange={setFormField}
        value={formState.logo}
        aspect={1 / 1}
        label='Profile picture'
      />
      <Upload
        name='cover'
        onChange={setFormField}
        value={formState.cover}
        aspect={4 / 1}
        label='Cover Image'
      />
    </div>
  )
}
