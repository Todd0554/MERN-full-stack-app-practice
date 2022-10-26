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

                   
                      {userInfo ? (
                        <NavDropdown title={userInfo.name} id='username'>
                          <LinkContainer to='/profile'>
                            <NavDropdown.Item>
                              MyHome
                            </NavDropdown.Item>
                          </LinkContainer>

                          <NavDropdown.Item onClick={logOutHandler}>
                            Log Out
                          </NavDropdown.Item>
                        </NavDropdown>
                        ) : (
                        <LinkContainer to='/login'>
                          <Nav.Link><i className="fas fa-user"/>Log In</Nav.Link>
                        </LinkContainer>
                        )
                      }
                    
                    {userInfo && userInfo.isAdmin && (
                      <NavDropdown title='Admin' id='adminmenu'>
                      <LinkContainer to='/admin/userlist'>
                        <NavDropdown.Item>
                          User List
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/productlist'>
                        <NavDropdown.Item>
                          Product List
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/orderlist'>
                        <NavDropdown.Item>
                          Order List
                        </NavDropdown.Item>
                      </LinkContainer>
                      
                    </NavDropdown>
                    )}
                  </Nav>
              </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header