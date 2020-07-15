import React, { useState, Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../Redux/actions/index'
import { Link } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap'

class NavBar extends Component {
  signOut = () => {
    this.props.signOut()
  }
  render() {
    return (
      <>
        <Navbar color="dark" light expand="md">
          <NavbarBrand
            style={{
              color: '#fff',
            }}
          >
            API OAUTH
          </NavbarBrand>
          <NavbarToggler />
          <Collapse navbar>
            {this.props.isAuth && (
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink>
                    <Link
                      to="/dashboard"
                      style={{
                        color: '#fff',
                      }}
                    >
                      Dashboard
                    </Link>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{
                      color: '#fff',
                    }}
                  >
                    GitHub
                  </NavLink>
                </NavItem>
              </Nav>
            )}
            <Nav navbar>
              {!this.props.isAuth && (
                <>
                  <NavItem>
                    <NavLink>
                      <Link
                        to="/signup"
                        style={{
                          color: '#fff',
                        }}
                      >
                        SignUp
                      </Link>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink>
                      <Link
                        to="/signin"
                        style={{
                          color: '#fff',
                        }}
                      >
                        SignIn
                      </Link>
                    </NavLink>
                  </NavItem>
                </>
              )}
              {this.props.isAuth && (
                <NavItem>
                  <NavLink>
                    <Link
                      onClick={this.signOut}
                      to="/signup"
                      style={{
                        color: '#fff',
                      }}
                    >
                      SignOut
                    </Link>
                  </NavLink>
                </NavItem>
              )}
            </Nav>
          </Collapse>
        </Navbar>
      </>
    )
  }
}

const mapStateTpProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
  }
}
export default connect(mapStateTpProps, actions)(NavBar)
