import React from "react";
import NavBar from "./NavBar";
import { Container } from "reactstrap";

const App = (props) => {
  return (
    <Container className="themed-container" fluid={true}>
      <NavBar />
      {props.children}
    </Container>
  );
};

export default App;
