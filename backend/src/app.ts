import 'dotenv/config';
import express from 'express';
import logger from './middlewares/logger';
import endPointNotFound from './middlewares/endpointNotFound';
import internalServerError from './middlewares/internalServerError';
import notesRoutes from './routes/notes';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(logger);
app.use(cors());

app.use('/api/notes', notesRoutes);

app.use(endPointNotFound);
app.use(internalServerError);


export default app;