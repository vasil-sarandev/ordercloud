import { Button as ButtonComponent } from 'antd'
import 'antd/es/button/style/index.css'
import { FC } from 'react'

type ButtonType = 'text' | 'link' | 'ghost' | 'default' | 'primary' | 'dashed'
type HTMLButtonType = 'button' | 'submit' | 'reset'

interface Props {
  block?: boolean
  danger?: boolean
  onClick: () => void
  type?: ButtonType
  disabled?: boolean
  loading?: boolean
  htmlType?: HTMLButtonType
  icon?: any
}
export const Button: FC<Props> = ({
  block,
  danger,
  onClick,
  children,
  type = 'primary',
  disabled,
  loading,
  htmlType,
  icon
}) => (
  <ButtonComponent
    block={block}
    danger={danger}
    onClick={onClick}
    icon={icon}
    type={type}
    disabled={disabled}
    loading={loading}
    htmlType={htmlType}
  >
    {children}
  </ButtonComponent>
)
