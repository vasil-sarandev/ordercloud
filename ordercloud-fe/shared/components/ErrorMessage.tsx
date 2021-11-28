import { FC } from 'react'

export type ErrorType = {
  message: string
}

interface Props {
  error: ErrorType
}

export const ErrorMessage: FC<Props> = ({ error }) => (
  <>
    <div className='error'>{error.message}</div>
    <style jsx>{`
      .error {
        font-size: 16px;
        font-weight: bold;
        color: var(--danger);
      }
    `}</style>
  </>
)
