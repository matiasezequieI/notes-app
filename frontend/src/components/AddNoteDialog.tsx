import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import AddNoteDialogProps from '../interfaces/AddNoteDialogProps';
import { useForm } from 'react-hook-form';
import NoteInput from '../interfaces/NoteInput';
import * as NotesApi from '../network/notes_api';


const AddNoteDialog = ({ onDismiss, onNoteSaved }: AddNoteDialogProps) => {
	const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NoteInput>();

	const onSubmit = async (input: NoteInput) => {
		try {
			const noteResponse = await NotesApi.createNote(input);
			onNoteSaved(noteResponse);
		} catch (error) {
			console.error(error);
			alert(error);
		}
	};

	return (
		<Modal show onHide={onDismiss}>
			<Modal.Header closeButton>
				<Modal.Title>
          Adicionar nota
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Form id='addNoteForm' onSubmit={handleSubmit(onSubmit)}>
					<Form.Group className='mb-3'>
						<Form.Label>Título</Form.Label>
						<Form.Control 
							type='text'
							placeholder='Título'
							isInvalid={!!errors.title}
							{...register('title', { required: true })}
						/>
						<Form.Control.Feedback type='invalid'>
							{'O campo título é obrigatório.'}
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group className='mb-3'>
						<Form.Label>Texto</Form.Label>
						<Form.Control 
							as='textarea'
							rows={5}
							placeholder='Texto'
							{...register('text')}
						/>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button
					type='submit'
					form='addNoteForm'
					disabled={isSubmitting}
				>
          Salvar
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default AddNoteDialog;