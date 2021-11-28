import { CaretLeftOutlined } from '@ant-design/icons'
import { FC } from 'react'
import { CustomLink } from './Link'

interface Props {
  text: string
  linkAs: string
  linkHref: string
}

export const BackButton: FC<Props> = ({ text, linkAs, linkHref }) => (
  <>
    <div className='back-button'>
      <CustomLink as={linkAs} href={linkHref}>
        <div className='inner-button'>
          <CaretLeftOutlined />
          {text}
        </div>
      </CustomLink>
    </div>
    <style jsx>{`
      .back-button {
        margin-bottom: var(--gutter);
        width: fit-content;
      }
      :global(.back-button .inner-button) {
        font-size: 12px;
        text-transform: uppercase;
        font-weight: bold;
        line-height: 20px;
        color: var(--primary);
      }
    `}</style>
  </>
)
