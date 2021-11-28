import { useAuth0 } from '@auth0/auth0-react'
import Image from 'next/image'
import { FC } from 'react'
import { Button, CustomLink } from '../../../shared'
import styles from '../styles/hero.module.css'

interface Props {}

export const HeroBanner: FC<Props> = () => {
  const { loginWithRedirect } = useAuth0()
  const handleSignUp = () => loginWithRedirect({ screen_hint: 'signup' })
  const demoUrl = 'https://ordercloud.bg/orders/demo-venue'
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <div className={styles.heading}>
            <h1>Създайте си дигитално меню за 5 минути!</h1>
          </div>
          <div className={styles.hint}>
            <h3>Започнете да приемате поръчки и онлайн още днес абсолютно безплатно.</h3>
          </div>
          <div className={styles.cta}>
            <div className={styles.btn}>
              <CustomLink as={demoUrl} href={demoUrl}>
                <Button onClick={() => {}}>Разгледай демото</Button>
              </CustomLink>
            </div>
            <div className={styles.signUp}>
              <Button type='link' onClick={handleSignUp}>
                или се регистрирай
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.image}>
            <Image
              src='https://ordercloud.s3.eu-central-1.amazonaws.com/assets/hero_image.png'
              width='306px'
              height='578px'
              layout='responsive'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
