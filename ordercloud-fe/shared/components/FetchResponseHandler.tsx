import { Skeleton } from 'antd'
import { FC, ReactChild } from 'react'
import { ErrorMessage, ErrorType } from './ErrorMessage'
import { Spin, SpinSize } from './Spin'

interface Props {
  loading: boolean
  error?: ErrorType
  size?: SpinSize
  isDataEmpty?: boolean
  dataEmptyMessage?: string
  showSkeleton?: boolean
  children: ReactChild | ReactChild[]
}

export const FetchResponseHandler: FC<Props> = ({
  loading,
  showSkeleton = false,
  error,
  size = 'default',
  isDataEmpty,
  dataEmptyMessage,
  children
}) => {
  if (loading && showSkeleton === false) return <Spin size={size} />
  if (loading && showSkeleton) return <Skeleton active />
  if (error) return <ErrorMessage error={error} />
  if (isDataEmpty)
    return (
      <div style={{ padding: '20px 10px', fontSize: '14px', color: 'var(--font-secondary)' }}>
        {dataEmptyMessage}
      </div>
    )
  return <>{children}</>
}
