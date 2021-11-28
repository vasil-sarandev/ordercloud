/* eslint-disable no-underscore-dangle */
import { FC } from 'react'
import { FetchResponseHandler } from '../../../../shared'
import { useGetProfile } from '../hook'
import styles from '../styles/container.module.css'
import { PersonalizeFormContainer } from './FormContainer'

interface Props {}

export const PersonalizeContainer: FC<Props> = () => {
  const { isLoading, error, data, refetchData } = useGetProfile()
  return (
    <div className={styles.container}>
      <FetchResponseHandler loading={isLoading} error={error}>
        <PersonalizeFormContainer initialData={data} refetchData={refetchData} />
      </FetchResponseHandler>
    </div>
  )
}
