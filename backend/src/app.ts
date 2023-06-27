import 'dotenv/config';
import express from 'express';
import endPointNotFound from './middlewares/endpointNotFound';
import errorHandler from './middlewares/errorHandler';
import notesRoutes from './routes/notes';
import userRoutes from './routes/users';
import morgan from 'morgan';
import session from 'express-session';
import env from './utils/validateEnv';
import MongoStore from 'connect-mongo';

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use(session({
	secret: env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 60 * 60 * 1000,
	},
	rolling: true,
	store: MongoStore.create({
		mongoUrl: env.MONGO_CONNECTION_STRING
	}),
}));

app.use('/api/notes', notesRoutes);
app.use('/api/users', userRoutes);

app.use(endPointNotFound);
app.use(errorHandler);


export default app;