import React from 'react';
import NavBarProps from '../interfaces/NavBarProps';
import { Container, Nav, Navbar } from 'react-bootstrap';
import NavBarLoggedInView from './NavBarLoggedInView';
import NavBarLoggedOutView from './NavBarLoggedOutView';
import { Link } from 'react-router-dom';

const NavBar = ({loggedInUser, onSignUpClicked, onLoginClicked, onLogoutSuccessful}: NavBarProps) => {
	return ( 
		<Navbar bg="primary" variant="dark" expand="sm" sticky="top">
			<Container>
				<Navbar.Brand as={Link} to='/'>
									Cool Notes App
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="main-navbar" />
				<Navbar.Collapse id="main-navbar">
					<Nav>
						<Nav.Link as={Link} to='/privacy'>
							Privacy
						</Nav.Link>
					</Nav>
					<Nav className="ms-auto">
						{ loggedInUser
							? <NavBarLoggedInView user={loggedInUser} onLogoutSuccessful={onLogoutSuccessful} />
							: <NavBarLoggedOutView onLoginClicked={onLoginClicked} onSignUpClicked={onSignUpClicked} />
						}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar> 
	);
};

export default NavBar;