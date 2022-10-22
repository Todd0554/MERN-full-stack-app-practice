import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {logOut} from '../actions/userActions'
import SearchBox from './SearchBox'

const Header = () => {
  const dispatch = useDispatch()
  const userLogIn = useSelector((state) => state.userLogIn)
  const {userInfo} = userLogIn

  const logOutHandler = (e) => {
    dispatch(logOut())
  }
  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <LinkContainer to='/'>
                <Navbar.Brand href="/">CodePhone</Navbar.Brand>
              </LinkContainer>

              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <SearchBox />
                  <Nav className="ms-auto">
                    <LinkContainer to="/cart">
                      <Nav.Link><i className="fas fa-shopping-cart"/>MyCart</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="login">
                      {userInfo ? (
                        <NavDropdown title={userInfo.name} id='username'>
                          <LinkContainer to='/profile'>
                            <NavDropdown.Item>
                              MyHome
                            </NavDropdown.Item>
                          </LinkContainer>
                          <NavDropdown.Item onClick={logOutHandler}>Log Out</NavDropdown.Item>
                        </NavDropdown>
                        ) : (
                        <Nav.Link><i className="fas fa-user"/>Log In</Nav.Link>
                        )
                      }

                    </LinkContainer>
                  </Nav>
              </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header