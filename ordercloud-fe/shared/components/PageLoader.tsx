import { FC } from 'react'
import Div100vh from 'react-div-100vh'
import { Spin } from './Spin'

interface Props {}

export const PageLoader: FC<Props> = () => (
  <>
    <Div100vh style={{ minHeight: '100rvh', display: 'flex', flexDirection: 'column' }}>
      <div className='container'>
        <Spin size='large' />
      </div>
      <style jsx>{`
        .container {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      `}</style>
    </Div100vh>
  </>
)
