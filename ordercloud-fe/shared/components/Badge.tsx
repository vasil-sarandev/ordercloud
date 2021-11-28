import { Badge as BadgeComponent } from 'antd'
import 'antd/es/badge/style/index.css'
import { FC } from 'react'

interface Props {
  count: number
  props: any
}
export const Badge: FC<Props> = ({ count, children, props }) => (
  <BadgeComponent {...props} count={count}>
    {children}
  </BadgeComponent>
)
