import AsyncSelectComponent from 'react-select/async'
import { FC } from 'react'

export interface OptionType {
  label: string
  value: string
}

interface Props {
  label?: string
  value: { label: string; value: string }
  onChange: (name: string, val: string) => void
  name: string
  cacheOptions?: boolean
  loadOptions: () => Promise<OptionType[]>
  defaultOptions?: boolean
  isSearchable?: boolean
}

export const AsyncSelect: FC<Props> = ({
  label,
  name,
  value,
  onChange,
  cacheOptions = false,
  isSearchable = false,
  defaultOptions = true,
  loadOptions
}) => {
  const handleChange = (val) => {
    onChange(name, val)
  }
  return (
    <div className='select-container'>
      {label && <div className='label'>{label}</div>}
      <AsyncSelectComponent
        cacheOptions={cacheOptions}
        defaultOptions={defaultOptions}
        value={value}
        onChange={handleChange}
        isSearchable={isSearchable}
        loadOptions={loadOptions}
        maxMenuHeight={250}
      />
      <style jsx>{`
        .label {
          margin-bottom: 5px;
        }
        .select-container {
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  )
}
