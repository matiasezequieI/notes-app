import React,{ useEffect, useState } from 'react';
import { Note as NoteModel } from './models/note';
import Note from './components/Note';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import styles from './styles/NotesPage.module.css';
import * as NotesApi from './network/notes_api';
import AddEditNoteDialog from './components/AddEditNoteDialog';
import styleUtils from './styles/utils.module.css';
import { FaPlus } from 'react-icons/fa';
import SignUpModal from './components/SignUpModal';
import LoginModal from './components/LoginModal';


function App() {
	const [notes, setNotes] = useState<NoteModel[]>([]);
	const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
	const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);
	const [notesLoading, setNotesLoading] = useState(true);
	const [showError, setShowError] = useState(false);

	useEffect(() => {
		const loadNotes = async () => { 
			try {
				setShowError(false);
				setNotesLoading(true);
				const notes = await NotesApi.fetchNotes();
				setNotes(notes);
			} catch (error) {
				console.error(error);
				setShowError(true);
			} finally {
				setNotesLoading(false);
			}
		};
		loadNotes();
	},[]);

	const deleteNote = async (note: NoteModel) => {
		try {
			await NotesApi.deleteNote(note._id);
			setNotes(notes.filter(existingNote => existingNote._id !== note._id));
		} catch (error) {
			console.error(error);
			alert(error);
		} 
	};

	const notesGrid = <Row xs={1} md={2} xl={3} className={`g-4 ${styles.noteGrid}`}>
		{notes.map(note => (
			<Col key={note._id}>
				<Note 
					note={note} 
					className={styles.note}
					onDeleteNoteClicked={deleteNote}
					onNoteClicked={setNoteToEdit}
				/>
			</Col>
		))}
	</Row>;

	return (
		<Container className={styles.notesPage}>
			<Button
				className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
				onClick={() => setShowAddNoteDialog(true)}>
				<FaPlus />
				Adicionar nota
			</Button>

			{notesLoading && <Spinner animation='border' variant='primary' />}
			{showError && <p>Erro ao tentar carregar as notas. Por favor, recarregue a página.</p> }
			{!notesLoading && !showError && 
				<>
					{
						notes.length > 0
							? notesGrid
							: <p>Você não possui nenhuma nota no momento.</p>
					}
				</>
			}

			{showAddNoteDialog && 
			<AddEditNoteDialog 
				onDismiss={() => setShowAddNoteDialog(false)}
				onNoteSaved={(newNote) => {
					setNotes([...notes, newNote]);
					setShowAddNoteDialog(false);
				}}
			/>}
			{
				noteToEdit &&
				<AddEditNoteDialog
					noteToEdit={noteToEdit}
					onDismiss={() => setNoteToEdit(null)}
					onNoteSaved={(updatedNote) => {
						setNotes(notes.map(note => note._id === updatedNote._id ? updatedNote : note));
						setNoteToEdit(null);
					}}
				/>
			}
			{false && 
				<SignUpModal 
					onDismiss={() => console.log()}
					onSignUpSuccessful={() => console.log()} 
				/>
			}

			{
				false &&
				<LoginModal
					onDismiss={() => console.log()}
					onLoginSuccessful={() => console.log()} 
				/>
			}
		</Container>
	);
}

export default App;
