import { isEmpty, isEqual } from 'lodash'
import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button } from '../../../../shared'
import styles from '../styles/form.module.css'
import {
  CreateVenueService,
  getCreateVenueValidationErrors,
  getValidateFormLoading,
  useCreateVenue
} from '../../create-venue'
import { PersonalizationForm } from '../component'
import { PersonalizationFormState } from '../util'
import { useSubmitProfile } from '../hook'

interface Props {
  initialData: PersonalizationFormState
  refetchData: () => void
}

export const PersonalizeFormContainer: FC<Props> = ({ initialData, refetchData }) => {
  const { isLoading, submitProfile } = useSubmitProfile()
  const [submitDisabled, setSubmitDisabled] = useState(true)
  const validateLoading = useSelector(getValidateFormLoading)
  const validationErrors = useSelector(getCreateVenueValidationErrors)

  const [formState, setFormState] = useState(initialData)
  const handleChange = (which, value) => {
    setFormState((prevState) => ({ ...prevState, [which]: value }))
  }
  const { setValidationError, setValidateFormLoading } = useCreateVenue()

  useEffect(() => {
    setValidateFormLoading(true)
    // doing this because validation is debounced.
    CreateVenueService.validateForm(formState, setValidationError, setValidateFormLoading, {
      name: initialData.name,
      slug: initialData.slug
    })
  }, [formState])

  useEffect(() => {
    const disable =
      !isEmpty(validationErrors.name) ||
      !isEmpty(validationErrors.slug) ||
      isEqual(formState, initialData) ||
      isEmpty(formState.name) ||
      isEmpty(formState.slug) ||
      isEmpty(formState.logo) ||
      isEmpty(formState.cover) ||
      isEmpty(formState.primaryColor) ||
      isEmpty(formState.secondaryColor)
    setSubmitDisabled(disable)
  }, [validationErrors, formState])

  const handleSubmit = async () => {
    await submitProfile(formState)
    refetchData()
  }
  return (
    <>
      <PersonalizationForm
        validationErrors={validationErrors}
        formState={formState}
        handleChange={handleChange}
      />
      <div className={styles.btnContainer}>
        <Button
          onClick={handleSubmit}
          disabled={submitDisabled || validateLoading}
          block
          loading={isLoading}
        >
          Запази промените
        </Button>
      </div>
    </>
  )
}
