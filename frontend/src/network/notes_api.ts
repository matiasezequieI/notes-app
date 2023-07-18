import NoteInput from '../interfaces/NoteInput';
import { Note } from '../models/note';
import { User } from '../models/user';
import { SignUpCredentials } from '../interfaces/SignUpCredentials';
import { LoginCredentials } from '../interfaces/LoginCredentials';

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

export const getLoggedInUser = async (): Promise<User> => {
	const response = await fetchData('/api/users', { method: 'GET' });
	return response.json();
};

export const signUp = async (credentials: SignUpCredentials): Promise<User> => {
	const response = await fetchData('/api/users/signup', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(credentials),
	});
	return response.json();
};

export const login = async (credentials: LoginCredentials): Promise<User> => {
	const response = await fetchData('/api/users/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(credentials),
	});
	return response.json();
};

export const logout = async () => {
	await fetchData('/api/users/logout', { method: 'POST' });
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
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(note),
		});
	return response.json();
};

export const updateNote = async(id:string, note: NoteInput) => {
	const response = await fetchData(`/api/notes/${id}`, 
		{ 
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(note),
		});
	return response.json();
};

export const deleteNote = async (id: string) => {
	await fetchData(`/api/notes/${id}`, { method: 'DELETE'});
};

