import React from 'react'
import NavBar from './NavBar/NavBar'
import { Container } from 'semantic-ui-react'
const App = (props) => {
  return (
    <Container>
      <NavBar />
      {props.children}
    </Container>
  )
}

export default App
