import React from 'react';
import NavBarProps from '../interfaces/NavBarProps';
import { Container, Navbar, NavbarBrand } from 'react-bootstrap';

const NavBar = ({
	loggedInUser,
	onSignUpClicked,
	onLoginClicked,
	onLoginSuccessful
}: NavBarProps) => {
	return (
		<Navbar bg='primary' variant='dark' expand='lg' sticky='top'>
			<Container>
				<Navbar.Brand>
					Cool Notes App
				</Navbar.Brand>
			</Container>
		</Navbar>
	);
};

export default NavBar;
