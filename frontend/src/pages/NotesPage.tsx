import React, { Container } from 'react-bootstrap';
import NotesPageLoggedInView from '../components/NotesPageLoggedInView';
import NotesPageLoggedOutView from '../components/NotesPageLoggedOutView';
import NotesPageProps from '../interfaces/NotesPageProps';
import styles from '../styles/NotesPage.module.css';


const NotesPage = ({ loggedInUser }: NotesPageProps) => {
	return (
		<>
			<Container className={styles.notesPage}>
				<>
					{loggedInUser
						? <NotesPageLoggedInView />
						: <NotesPageLoggedOutView />
					}
				</>
			</Container>
		</>
	);
};

export default NotesPage;