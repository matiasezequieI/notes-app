import { NextFunction, Request, Response } from 'express';

const endPointNotFound = (req: Request, res: Response, next: NextFunction) => {
	res.status(404).json({message: 'Endpoint not found.'});
	next();
};

export default endPointNotFound;