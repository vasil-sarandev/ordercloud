import { Drawer as DrawerComponent } from 'antd'
import 'antd/es/drawer/style/index.css'
import { FC } from 'react'

type Placement = 'right' | 'top' | 'bottom' | 'left'

interface Props {
  visible: boolean
  closable?: boolean
  placement?: Placement
  width: number
  destroyOnClose?: boolean
  onClose: any
  mask?: boolean
}

export const Drawer: FC<Props> = ({
  visible,
  closable = false,
  placement = 'right',
  width,
  mask = true,
  onClose,
  destroyOnClose = true,
  children
}) => (
  <DrawerComponent
    visible={visible}
    closable={closable}
    placement={placement}
    destroyOnClose={destroyOnClose}
    width={width}
    style={{ zIndex: 100000 }}
    mask={mask}
    onClose={onClose}
  >
    {children}
  </DrawerComponent>
)
