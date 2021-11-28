import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import Div100vh from 'react-div-100vh'
import { useSelector } from 'react-redux'
import { Card, Step, Steps } from '../../../../shared'
import { VenueInformation, VenuePersonalization } from '../component'
import {
  getCreateVenueLoading,
  getCreateVenueRedirectUrl,
  getValidateFormLoading,
  useCreateVenue
} from '../ducks'
import styles from '../styles/main.module.css'

interface Props {}

const LOGO_URL = process.env.logo_url

export const CreateVenueContainer: FC<Props> = () => {
  const [current, setCurrent] = useState(0)
  const validateLoading = useSelector(getValidateFormLoading)
  const createVenueLoading = useSelector(getCreateVenueLoading)
  const [nextDisabled, setNextDisabled] = useState(true)
  const { createVenue } = useCreateVenue()

  // doing this because you can't redirect from redux since next router is not connected to store.
  const router = useRouter()
  const redirectUrl = useSelector(getCreateVenueRedirectUrl)
  useEffect(() => {
    if (redirectUrl) router.push(redirectUrl)
  }, [redirectUrl])

  const STEPS: Array<Step> = [
    { title: 'Детайли', component: <VenueInformation setNextDisabled={setNextDisabled} /> },
    {
      title: 'Персонализация',
      component: <VenuePersonalization setNextDisabled={setNextDisabled} />
    }
  ]

  return (
    <Div100vh style={{ minHeight: '100rvh', display: 'flex', flexDirection: 'column' }}>
      <div className={styles.container}>
        <div className={styles.stepsContainer}>
          <Card style={{ margin: '0 auto' }}>
            <>
              <div className={styles.header}>
                <div className={styles.logo}>
                  <Image src={LOGO_URL} layout='responsive' width='300px' height='60px' />
                </div>
                <div className={styles.heading}>
                  <h2>Създаване на заведение</h2>
                </div>
              </div>
              <Steps
                current={current}
                setCurrent={setCurrent}
                steps={STEPS}
                loading={validateLoading || createVenueLoading}
                nextDisabled={nextDisabled}
                onFinish={createVenue}
              />
            </>
          </Card>
        </div>
      </div>
    </Div100vh>
  )
}
