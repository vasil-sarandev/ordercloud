import { Input as InputComponent } from 'antd'
import 'antd/es/input/style/index.css'
import { FC } from 'react'

interface Props {
  label?: string
  type?: string
  value: string | number
  disabled?: boolean
  name: string
  placeholder?: string
  onChange: (name: string, val: string) => void
  required?: boolean
  pattern?: string
  title?: string
  autoComplete?: string
}
export const Input: FC<Props> = ({
  value,
  disabled = false,
  name,
  onChange,
  type = 'text',
  label,
  placeholder,
  required,
  pattern,
  title,
  autoComplete = 'on'
}) => {
  const handleChange = (e) => {
    onChange(name, e.target.value)
  }
  return (
    <>
      <div className='input-container'>
        {label && <div className='label'>{label}</div>}
        <InputComponent
          value={value}
          disabled={disabled}
          onChange={handleChange}
          type={type}
          name={name}
          autoComplete={autoComplete}
          placeholder={placeholder}
          required={required}
          pattern={pattern}
          title={title}
        />
      </div>

      <style jsx>{`
        .label {
          margin-bottom: 5px;
        }
        .input-container {
          margin-bottom: 10px;
        }
      `}</style>
    </>
  )
}
