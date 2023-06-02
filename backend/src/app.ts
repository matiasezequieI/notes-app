import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import NoteModel from './models/note';
import logger from './middlewares/logger';
import endPointNotFound from './middlewares/endpointNotFound';
import internalServerError from './middlewares/internalServerError';

const app = express();

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const notes = await NoteModel.find().exec();
		res.status(200).json(notes);
	} catch(error){
		next(error);
	}
});

app.use(logger);
app.use(endPointNotFound);
app.use(internalServerError);

export default app;