import 'dotenv/config';
import express from 'express';
import endPointNotFound from './middlewares/endpointNotFound';
import errorHandler from './middlewares/errorHandler';
import notesRoutes from './routes/notes';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/api/notes', notesRoutes);

app.use(endPointNotFound);
app.use(errorHandler);


export default app;