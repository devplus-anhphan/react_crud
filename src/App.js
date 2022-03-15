import * as React from "react";
import { Outlet } from "react-router-dom";
import { Navbar, Container, Nav } from 'react-bootstrap'
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/home">
            <img
              alt=""
              src="logo192.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            React Bootstrap
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/add">Add</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
      <Outlet />
    </div>

  );
}


export default App;
