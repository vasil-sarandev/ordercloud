import { Steps as StepsComponent } from 'antd'
import 'antd/es/steps/style/index.css'
import { FC, ReactChild, ReactChildren } from 'react'
import { Button } from './Button'

const { Step: StepComponent } = StepsComponent

type Direction = 'vertical' | 'horizontal'

export interface Step {
  title: string
  description?: string
  component: ReactChild | ReactChildren
}

interface Props {
  current: number
  setCurrent: (number) => void
  steps: Step[]
  onFinish: () => void
  showActions?: boolean
  nextDisabled?: boolean
  prevLabel?: string
  nextLabel?: string
  lastLabel?: string
  direction?: Direction
  loading?: boolean
}

export const Steps: FC<Props> = ({
  current,
  setCurrent,
  steps,
  onFinish,
  nextDisabled,
  showActions = true,
  loading = false,
  prevLabel = 'Назад',
  nextLabel = 'Напред',
  lastLabel = 'Запази',
  direction = 'vertical'
}) => {
  const currentContent = steps[current].component
  const displaySteps = steps.map((step) => (
    <StepComponent key={step.title} title={step.title} description={step.description} />
  ))

  const prev = () => {
    setCurrent(current - 1)
  }
  const next = () => {
    setCurrent(current + 1)
  }
  const disablePrev = current === 0
  const isLast = current === steps.length - 1

  return (
    <>
      <StepsComponent current={current} type='default' direction={direction}>
        {displaySteps}
      </StepsComponent>
      <div className='steps-content'>{currentContent}</div>
      {showActions && (
        <div className='steps-actions'>
          <Button onClick={prev} disabled={disablePrev}>
            {prevLabel}
          </Button>
          <Button
            onClick={() => {
              if (isLast) onFinish()
              else next()
            }}
            loading={loading}
            disabled={nextDisabled}
          >
            {isLast ? lastLabel : nextLabel}
          </Button>
        </div>
      )}
      <style jsx>{`
        .steps-content {
          margin: var(--gutter) 0px;
        }
        :global(.steps-actions > button:not(:last-child)) {
          margin-right: 8px !important;
        }
      `}</style>
    </>
  )
}
