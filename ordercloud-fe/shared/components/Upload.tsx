import { UploadOutlined } from '@ant-design/icons'
import { Button, Upload as UploadComponent } from 'antd'
import 'antd/es/upload/style/index.css'
import 'antd/es/modal/style/index.css'
import 'antd/es/slider/style/index.css'
import { FC } from 'react'
import ImgCrop from 'antd-img-crop'

export interface UploadProps {
  value: any
  onChange: (name: string, value: any) => void
  name: string
  label?: string
  aspect: number
}

export const Upload: FC<UploadProps> = ({
  name,
  value,
  onChange,
  label = 'Upload File',
  aspect = 1 / 1
}) => {
  const handleChange = ({ file }) => {
    if (file.status !== 'removed') {
      onChange(name, [file])
    } else onChange(name, [])
  }
  const onPreview = async (file) => {
    let src = file.url
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj)
        reader.onload = () => resolve(reader.result)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow.document.write(image.outerHTML)
  }
  const beforeUpload = (file) => {
    handleChange({ file })
    return false
  }
  return (
    <div className='upload-container'>
      <div className='label'>{label}</div>
      <ImgCrop aspect={aspect} quality={1}>
        <UploadComponent
          fileList={value}
          maxCount={1}
          onRemove={() => {
            onChange(name, [])
          }}
          onPreview={onPreview}
          beforeUpload={beforeUpload}
        >
          <Button icon={<UploadOutlined />} block>
            Upload
          </Button>
        </UploadComponent>
      </ImgCrop>
      <style jsx>{`
        .label {
          margin-bottom: 5px;
        }
        .upload-container {
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  )
}
