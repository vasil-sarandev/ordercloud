import { useAuth0 } from '@auth0/auth0-react'
import { FC } from 'react'
import { Button } from '../../../shared'
import { Step } from '../component'
import styles from '../styles/howItWorks.module.css'

interface Props {}

export const HowItWorks: FC<Props> = () => {
  const { loginWithRedirect } = useAuth0()
  const handleSignUp = () => loginWithRedirect({ screen_hint: 'signup' })

  const STEPS_INFO = [
    {
      title: 'Регистрирайте се в системата ни',
      description:
        'Всеки собственик/управител на заведение следва да ползва e-mail и парола, за да влезе в системата.'
    },

    {
      title: 'Създайте заведението',
      description: 'Изберете име и идентификатор - URL-а, на който  ще се намират вашите менюта.'
    },
    {
      title: 'Персонализирайте!',
      description:
        'При създаването на екрана ви предоставяме опция да изберете цветовата си гама и да качите брандираните снимки на заведението. Може да бъдат променени по всяко време.'
    },
    {
      title: 'Входирайте менюто си.',
      description:
        'Чрез административния панел създайте вашите категории и продукти, за да могат клиентите ви да ги виждат.'
    },
    {
      title: 'Готови сте да получавате поръчки!',
      description:
        'Копирайте линковете към менютата ви от административния панел и разпространете във вашите социални мрежи и към клиентите ви.'
    },
    {
      title: `Искате да създадате вашето дигитално меню?`,
      description: (
        <>
          <div className={styles.btn}>
            <Button onClick={handleSignUp}>Регистрирайте се</Button>
          </div>
        </>
      ),
      hideIndex: true
    }
  ]
  const steps = STEPS_INFO.map((step, i) => (
    <Step {...step} key={step.title} index={step.hideIndex ? undefined : `0${i + 1}`} />
  ))
  return (
    <div className={styles.container}>
      <h2>Как да си направя дигитално меню?</h2>
      <div className={styles.description}>
        Няколко лесни стъпки за всеки, който иска да се възползва.
      </div>
      <div className={styles.steps}>{steps}</div>
    </div>
  )
}
