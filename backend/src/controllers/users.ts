import { RequestHandler } from 'express';
import SignUpBody from '../interfaces/SignUpBody';
import createHttpError from 'http-errors';
import UserModel from '../models/user';
import bcrypt from 'bcrypt';

export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (req, res, next) => {
	const { username, email, password } = req.body;

	try {
		if(!username || !email || !password) {
			throw createHttpError(400, 'Parameters missing');
		} 
    
		const existingUsername = await UserModel.findOne({ username: username }).exec();

		if (existingUsername) {
			throw createHttpError(409, 'Username already taken. Please choose a different one or log in instead');
		}

		const existingEmail = await UserModel.findOne({ email: email }).exec();

		if (existingEmail) {
			throw createHttpError(409, 'A user with this email address already exists. Please log in instead');
		}

		const passwordHashed = await bcrypt.hash(password, 10);

		const newUser = await UserModel.create({
			username,
			email,
			password: passwordHashed,
		});

		return res.status(201).json(newUser);
	} catch (error) {
		next(error);
	}
};
