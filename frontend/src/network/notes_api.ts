import NoteInput from '../interfaces/NoteInput';
import { Note } from '../models/note';

const fetchData = async (input: RequestInfo, init?: RequestInit) => { 
	const response = await fetch(input, init);
	if (response.ok) {
		return response;
	} else {
		const errorBody = await response.json();
		const errorMessage = errorBody.message;
		throw Error(errorMessage);
	}
};

export const fetchNotes = async (): Promise<Note[]> => {
	const response = await fetchData('/api/notes', { method: 'GET' });
	return response.json();
};

export const createNote = async (note: NoteInput): Promise<Note> => {
	const response = await fetchData('/api/notes', 
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(note),
		});
	return response.json();
};

export const deleteNote = async (id: string) => {
	await fetchData(`/api/notes/${id}`, { method: 'DELETE'});
};