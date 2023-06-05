import 'dotenv/config';
import express from 'express';
import endPointNotFound from './middlewares/endpointNotFound';
import internalServerError from './middlewares/internalServerError';
import notesRoutes from './routes/notes';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/api/notes', notesRoutes);

app.use(endPointNotFound);
app.use(internalServerError);


export default app;