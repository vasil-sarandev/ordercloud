import { Spin as SpinComponent } from 'antd'
import 'antd/es/spin/style/index.css'
import { FC } from 'react'

export type SpinSize = 'small' | 'default' | 'large'

interface Props {
  size: SpinSize
}

export const Spin: FC<Props> = ({ size }) => (
  <SpinComponent size={size} style={{ display: 'block' }} />
)
