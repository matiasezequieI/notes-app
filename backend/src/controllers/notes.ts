import { RequestHandler } from 'express';
import NoteModel from '../models/note';
import CreateNoteBody from '../interfaces/CreateNoteBody';
import UpdateNoteBody from '../interfaces/UpdateNoteBody';
import UpdateNoteParams from '../interfaces/UpdateNoteParams';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';

const getNotes: RequestHandler = async (req, res, next) => {
	try {
		const notes = await NoteModel.find().exec();
		res.status(200).json(notes);
	} catch (error){
		next(error);
	}	
};

const getNote: RequestHandler = async (req, res, next) => {
	const { id } = req.params;
	try {
		if (!mongoose.isValidObjectId(id)) {
			throw createHttpError(400, 'Invalid note ID format');
		}

		const note = await NoteModel.findById(id).exec();

		if (!note) {
			throw createHttpError(404, 'Note not found');
		}

		res.status(200).json(note);
	} catch (error) {
		next(error);
	}
};

const createNote: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (req, res, next) => {
	const { title, text } = req.body;

	try {
		if (!title) {
			throw createHttpError(400, 'Note must have a title');
		}

		const newNote = await NoteModel.create({
			title,
			text,
		});
		res.status(201).json(newNote);
	} catch (error) {
		next(error);
	}
};

const updateNote: RequestHandler<UpdateNoteParams, unknown, UpdateNoteBody, unknown> = async (req, res, next) => {
	const { id } = req.params;
	const { title, text } = req.body;

	try {
		if (!mongoose.isValidObjectId(id)) {
			throw createHttpError(400, 'Invalid note ID format');
		}

		if (!title) {
			throw createHttpError(400, 'Note must have a title');
		}
		
		const note = await NoteModel.findById(id).exec();

		if (!note) {
			throw createHttpError(404, 'Note not found');
		}

		note.title = title;
		note.text = text;

		const updatedNote = await note.save();

		res.status(200).json(updatedNote);
	} catch (error) {
		next(error);
	}
};

const deleteNote: RequestHandler = async (req, res, next) => {
	const { id } = req.params;

	try {
		if (!mongoose.isValidObjectId(id)) {
			throw createHttpError(400, 'Invalid note ID format');
		}

		const note = await NoteModel.findById(id).exec();

		if (!note) {
			throw createHttpError(404, 'Note not found');
		}

		await note.deleteOne();

		res.sendStatus(204);

	} catch (error) {
		next(error);
	}
};

export { getNotes, createNote, getNote, updateNote, deleteNote };