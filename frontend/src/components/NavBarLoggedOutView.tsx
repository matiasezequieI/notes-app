import React from 'react';
import NavBarLoggedOutViewProps from '../interfaces/NavBarLoggedOutViewProps';
import { Button } from 'react-bootstrap';

const NavBarLoggedOutView = ({ onSignUpClicked, onLoginClicked }: NavBarLoggedOutViewProps) => {
	return (
		<>
			<Button onClick={onSignUpClicked}>Sign Up</Button>
			<Button onClick={onLoginClicked}>Log In</Button>
		</>
	);
};

export default NavBarLoggedOutView;