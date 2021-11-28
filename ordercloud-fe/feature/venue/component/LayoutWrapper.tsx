import { FC, ReactChild } from 'react'

interface Props {
  children: ReactChild | ReactChild[]
  includePadding?: boolean
}

export const LayoutWrapper: FC<Props> = ({ children, includePadding = true }) => {
  const paddingCSS = includePadding ? { padding: '0px 10px;' } : { padding: '0px 0px' }
  return (
    <>
      <div className='layout-wrapper' style={paddingCSS}>
        {children}
      </div>
      <style jsx>{`
        .layout-wrapper {
          max-width: 1100px;
          margin: 0 auto;
          user-select: none;
        }
      `}</style>
    </>
  )
}
