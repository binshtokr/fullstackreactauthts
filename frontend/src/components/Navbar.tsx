import React from 'react';
import { Container, Nav, Navbar as NavbarBs, NavbarToggle, NavbarCollapse } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navbar() {
    const { isAuthenticated } = useAuth();

    return (
        <NavbarBs sticky="top" bg="dark" variant="dark" expand="lg" className="shadow-sm ">
            <Container>
                <NavbarBs.Brand as={NavLink} to="/" className="text-light">
                    ReactAuthTsApp
                </NavbarBs.Brand>
                <NavbarToggle aria-controls="navbar-nav" />
                <NavbarCollapse id="navbar-nav">
                    <Nav className="ms-auto">
                        {!isAuthenticated && (
                            <>
                                <Nav.Link to="/signup" as={NavLink}>
                                    Sign Up
                                </Nav.Link>
                                <Nav.Link to="/signin" as={NavLink}>
                                    Sign In
                                </Nav.Link>
                            </>
                        )}
                        {isAuthenticated && (
                            <>
                                <Nav.Link to="/home" as={NavLink}>
                                    Home
                                </Nav.Link>

                            </>
                        )}
                    </Nav>
                </NavbarCollapse>
            </Container>
        </NavbarBs>
    );
}
