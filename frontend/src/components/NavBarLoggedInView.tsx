import React from 'react';
import NavBarLoggedInViewProps from '../interfaces/NavBarLoggedInViewProps';
import * as NotesApi from '../network/notes_api';
import { Button, Navbar } from 'react-bootstrap';

const NavBarLoggedInView = ({ user, onLogoutSuccessful }:NavBarLoggedInViewProps) => {
	const logout = async () => {
		try {
			await NotesApi.logout();
			onLogoutSuccessful();
		} catch(error) {
			console.error(error);
			alert(error);
		}
	};

	return (
		<>
			<Navbar.Text className='me-2'>
        Signed in as: { user.username }
			</Navbar.Text>
			<Button onClick={logout}>Log Out</Button>
		</>
	);
};

export default NavBarLoggedInView;