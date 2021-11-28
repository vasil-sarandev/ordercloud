import { FC } from 'react'

interface Props {}

export const ErrorPage: FC<Props> = () => (
  <>
    <div className='message'>Възникна неочаквана грешка, моля опитайте отново или по-късно.</div>
    <style jsx>{`
      .message {
        font-size: 14px;
        padding: 0px 20px;
        color: #545454;
        font-weight: bold;
        text-align: center;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-family: var(--font-Righteous);
      }
    `}</style>
  </>
)
