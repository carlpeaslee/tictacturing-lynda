import React from 'react'
import styled from 'styled-components'
import {media} from '../utils/media'


const Container = styled.main`
  display: flex;
  margin: auto;
  flex-direction: column;
  min-width: 800px;
  max-width: 80%;
  ${media.handheld`
    width: 100%;
  `}
`

const Main = (props) => {
  return (
    <Container>
      {props.children}
    </Container>
  )
}

export default Main
