import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Menu from 'material-ui/svg-icons/navigation/menu'
import styled from 'styled-components'

type Props = {
  open: boolean,
  width: number
}

const StayVisible = styled.div`
  position: absolute;
  margin-left: ${(props: Props) => (props.open) ? `${props.width}px` : 'none'};
  transition: margin .2s;

`

const DrawerToggleButton = (props: Props) => {
  return (
    <StayVisible
      {...props}
    >
      <FloatingActionButton
        {...props}
      >
          <Menu/>
      </FloatingActionButton>
    </StayVisible>
  )
}

export default DrawerToggleButton
