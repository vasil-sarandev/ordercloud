import { Checkbox as CheckboxComponent } from 'antd'
import 'antd/es/checkbox/style/index.css'
import { FC } from 'react'

interface Props {
  value: boolean
  disabled?: boolean
  name: string
  onChange: (name: string, val: boolean) => void
}
export const Checkbox: FC<Props> = ({ value, disabled = false, name, onChange, children }) => {
  const handleChange = (e) => {
    onChange(name, e.target.checked)
  }
  return (
    <>
      <CheckboxComponent checked={value} disabled={disabled} onChange={handleChange}>
        {children}
      </CheckboxComponent>
    </>
  )
}
