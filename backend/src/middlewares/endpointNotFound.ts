import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';

const endPointNotFound = (req: Request, res: Response, next: NextFunction) => {
	next(createHttpError(404, 'Endpoint not found'));
};

export default endPointNotFound;