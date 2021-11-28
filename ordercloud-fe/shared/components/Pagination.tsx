import { FC } from 'react'
import { Progress } from 'antd'
import { Button } from './Button'

interface Props {
  count?: number
  total?: number
  loading: boolean
  cmsTexts: { loadMoreButton?: string; countInfoMiddle?: string; countInfoText?: string }
  onLoadMore: () => void
}

export const Pagination: FC<Props> = ({
  count = 0,
  total = 0,
  loading,
  cmsTexts: {
    loadMoreButton = 'Зареди още',
    countInfoMiddle = 'от',
    countInfoText = 'записа показани'
  },
  onLoadMore
}) => {
  // 5 of 20

  const percentage = ((count / total) * 100).toFixed(0)
  return (
    <>
      <div className='pagination-container'>
        <div className='pagination-info'>
          {count} {countInfoMiddle} {total} {countInfoText}
        </div>
        <div className='pagination-progress'>
          <Progress percent={+percentage} type='line' size='small' showInfo={false} />
        </div>
        <div className='pagination-button'>
          <Button onClick={onLoadMore} loading={loading} type='dashed' disabled={count === total}>
            {loadMoreButton}
          </Button>
        </div>
      </div>

      <style jsx>{`
        .pagination-container {
          max-width: 260px;
          margin: 0 auto;
        }
        .pagination-progress,
        .pagination-button,
        .pagination-info {
          display: flex;
          justify-content: center;
        }
        .pagination-button {
          margin-top: 10px;
        }
      `}</style>
    </>
  )
}
