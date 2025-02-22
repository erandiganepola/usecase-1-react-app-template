// import logo from './logo.svg';
import React, { useEffect } from 'react';
import './App.css';
import './App.scss';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom';
import { useAuthContext } from "@asgardeo/auth-react";

import Catalog from './components/Catalog/Catalog.js';
import MyCart from './components/MyCart/Cart.js';
import Admin from './components/Admin/Admin.js';

// Component to render the login/signup/logout menu
const RightLoginSignupMenu = () => {
  const history = useHistory();

  const { state, signIn, signOut } = useAuthContext();
  useEffect(() => {
    if (state.isAuthenticated) {
      console.log("Allowed scopes: ", state.allowedScopes);
      // if allowedScopes has admin scope, navigate to /admin
      if (state.allowedScopes.includes("urn:erandisaorg:getproductdetails:list")) {
        history.push("/admin");
      }
    }
  }, [state.isAuthenticated]);

  console.log("state: ", state);

  // Based on Asgardeo SDK, set a variable like below to check and conditionally render the menu
  let isLoggedIn = state.isAuthenticated;

  // Host the menu content and return it at the end of the function
  let menu;

  // Conditionally render the following two links based on whether the user is logged in or not
  if (isLoggedIn) {
    menu = <>
      <Nav>
        <Nav.Link href="#deets"><button onClick={() => signOut()}>Logout</button></Nav.Link>
        <Nav.Link href="#deets"><FontAwesomeIcon icon={faUser} /></Nav.Link></Nav>
    </>
  } else {
    menu = <>
      <Nav>
        <Nav.Link href="#deets"><button onClick={() => signIn()}>Login</button></Nav.Link>
        <Nav.Link href="#deets">Sign Up</Nav.Link></Nav>
    </>
  }
  return menu;
}

// Component to render the navigation bar
const PetStoreNav = () => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">PetStore</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Catalog</Nav.Link>
              <Nav.Link href="/mycart">My Cart</Nav.Link>
              <Nav.Link href="/admin">Admin</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <RightLoginSignupMenu />
        </Container>
      </Navbar>
    </>
  );
};

// Main app component
const App = () => {
  useEffect(() => {
    document.title = 'PetStore';
  }, []);

  return (
    <>
      <BrowserRouter>
        <PetStoreNav />
        <Switch>
          <Route exact path="/">
            <Catalog />
          </Route>
          <Route path="/mycart">
            <MyCart />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
