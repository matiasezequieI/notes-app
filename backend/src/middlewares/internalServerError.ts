import { NextFunction, Request, Response } from 'express';

const internalServerError = (error: unknown ,req: Request, res: Response, next: NextFunction) => {
	console.error(error);
	let errorMessage = 'An unknown error ocurred';
	if (error instanceof Error) errorMessage = error.message;
	res.status(500).json({message: errorMessage});
	next();
};

export default internalServerError;