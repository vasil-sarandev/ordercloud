import { Input } from 'antd'
import 'antd/es/input/style/index.css'
import { FC } from 'react'

interface Props {
  label?: string
  value: string
  disabled?: boolean
  name: string
  placeholder?: string
  onChange: (name: string, val: string) => void
  required?: boolean
  title?: string
}

const { TextArea: TextAreaComponent } = Input

export const TextArea: FC<Props> = ({
  value,
  disabled = false,
  name,
  onChange,
  label,
  placeholder,
  required,
  title
}) => {
  const handleChange = (e) => {
    onChange(name, e.target.value)
  }
  return (
    <>
      <div className='textarea-container'>
        {label && <div className='label'>{label}</div>}
        <TextAreaComponent
          required={required}
          title={title}
          value={value}
          disabled={disabled}
          onChange={handleChange}
          placeholder={placeholder}
        />
      </div>
      <style jsx>{`
        .label {
          margin-bottom: 5px;
        }
        .textarea-container {
          margin-bottom: 10px;
        }
      `}</style>
    </>
  )
}
