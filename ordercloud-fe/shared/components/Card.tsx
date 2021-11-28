import { Card as CardComponent } from 'antd'
import 'antd/es/card/style/index.css'
import { FC, ReactChild, ReactChildren } from 'react'

interface Props {
  children: ReactChild | ReactChildren
  style?: any
}

export const Card: FC<Props> = ({ children, style }) => (
  <CardComponent style={style}>{children}</CardComponent>
)
