import { FC } from 'react'
import { TwitterPicker } from 'react-color'

interface Props {
  name: string
  value: string
  label?: string
  onChange: (which: string, val: string) => void
}

export const ColorPicker: FC<Props> = ({ name, value, onChange, label = 'color' }) => {
  const handleChange = (val) => {
    onChange(name, val.hex)
  }
  return (
    <div className='colorpicker-container'>
      <div className='label'>
        {label}
        <div className='color-preview' style={{ backgroundColor: `${value}` }} />
      </div>
      <TwitterPicker color={value} onChangeComplete={handleChange} />
      <style jsx>{`
        .label {
          margin-bottom: 5px;
          display: flex;
        }
        .colorpicker-container {
          margin-bottom: 10px;
        }
        :global(.twitter-picker) {
          width: 100% !important;
        }
        .color-preview {
          margin-left: 5px;
          width: 20px;
          height: 20px;
          border-radius: 5px;
        }
      `}</style>
    </div>
  )
}
