import React from 'react';
import styles from '../styles/Note.module.css';
import stylesUtils from '../styles/utils.module.css';
import { Card } from 'react-bootstrap';
import { formatDate } from '../utils/formatDate';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import NoteProps from '../interfaces/NoteProps';

const Note = ({ note, onNoteClicked, onDeleteNoteClicked, className }: NoteProps) => {
	const { title, text, createdAt, updatedAt } = note;

	let createdUpdatedText: string;

	if (updatedAt> createdAt) {
		createdUpdatedText = `Updated: ${formatDate(updatedAt)}`;
	} else {
		createdUpdatedText = `Created: ${formatDate(createdAt)}`;
	}
  
	return (
		<Card className={`${styles.noteCard} ${className}`}>
			<Card.Body className={styles.cardBody}>
				<Card.Title className={stylesUtils.flexCenter}>
					{title}
					<div>
						<MdModeEdit
							className='text-muted'
							onClick={(e: Event) => {
								onNoteClicked(note);
								e.stopPropagation();
							}}
						/>
						<MdDelete 
							className='text-muted'
							onClick={(e: Event) => {
								onDeleteNoteClicked(note);
								e.stopPropagation();
							}}
						/>
					</div>
				</Card.Title>
				<Card.Text className={styles.cardText}>
					{text}
				</Card.Text>
			</Card.Body>
			<Card.Footer className='text-muted'>
				{createdUpdatedText}
			</Card.Footer>
		</Card>
	);
};

export default Note;